import axios from '../http/http'
import { storeToken, removeToken } from '../helpers/local-storage'

export function login(email, password) {
    return axios.post(process.env.VUE_APP_LOGIN_BACKEND_ROUTE, {
        email,
        password
    });
}

export function refresh(request) {
    return axios.post(process.env.VUE_APP_REFRESH_BACKEND_ROUTE)
        .then(res => {
            storeToken(res.data.access_token)
            return axios.request(request.config)            
        })
        .catch(err => {
            removeToken()
            return Promise.reject(err)
        })
}

