import axios from 'axios'
import nookies from 'nookies'
import config from 'libs/config'

const API = axios.create({
    baseURL: config.apiUrl,
    withCredentials: true
})

function setCookies(token) {
    const config = {
        maxAge: 30 * 24 * 60 * 60
    }

    nookies.set(null, 'access', token.access, config)
    nookies.set(null, 'refresh', token.refresh, config)
}

// API.interceptors.request.use(config => {
//     const cookies = nookies.get()
//     console.log(config)
//     return config
// }, error => Promise.reject(error))

API.interceptors.response.use(response => {
    if (response.data.data?.token) {
        setCookies(response.data.data.token)
    }
    if (response.config.url === '/auth/logout') {
        nookies.destroy(null, 'access')
        nookies.destroy(null, 'refresh')
    }
    return response
}, async error => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !error.config._retry) {
        originalRequest._retry = true

        return API.get('/auth/token').then(res => {
            if (res.status === 201) {
                console.warn('New token generated')
                setCookies(res.data.data.token)
                return API(originalRequest)
            }
        })
    }
    return Promise.reject(error)
})

export default API