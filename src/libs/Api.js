import axios from 'axios'
import config from 'libs/config'

const API = axios.create({
    baseURL: config.apiUrl,
    withCredentials: true
})

API.interceptors.response.use(response => response, async error => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !error.config._retry) {
        originalRequest._retry = true

        return API.get('/auth/token').then(res => {
            if (res.status === 201) {
                console.warn('New token generated')
                return API(originalRequest)
            }
        })
    }
    return Promise.reject(error)
})

export default API