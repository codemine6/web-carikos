import axios from 'axios'
import nookies from 'nookies'
import config from 'libs/config'

function setCookies(token) {
    nookies.set(null, 'access', token.access, {maxAge: 30 * 24 * 60 * 60})
    nookies.set(null, 'refresh', token.refresh, {maxAge: 30 * 24 * 60 * 60})
}

const API = axios.create({
    baseURL: config.apiUrl
})

API.interceptors.request.use(config => {
    const {access} = nookies.get()
    if (access) {
        config.headers.Authorization = 'Bearer ' + access
    }
    if (config.url === '/auth/logout') {
        nookies.destroy(null, 'access')
        nookies.destroy(null, 'refresh')
    }
    return config
}, error => Promise.reject(error))

API.interceptors.response.use(response => {
    if (response.data.data?.token) {
        setCookies(response.data.data.token)
    }
    return response
}, async error => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !error.config._retry) {
        originalRequest._retry = true
        const {refresh} = nookies.get()

        return API.post('/auth/token', {refresh}).then(res => {
            if (res.status === 201) {
                console.warn('New token generated')
                setCookies(res.data.data.token)
                return API(originalRequest)
            }
        })
    }
    return Promise.reject(error)
})

export function getData(url, context) {
    const {access} = nookies.get(context)
    const config = {
        headers: {
            Authorization: 'Bearer ' + access
        }
    }

    return API.get(url, config)
}

export default API