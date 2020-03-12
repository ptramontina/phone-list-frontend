import axios from '../http/http'
import { storeToken } from '../helpers/local-storage'

export function login(email, password) {
    return axios.post(process.env.VUE_APP_LOGIN_BACKEND_ROUTE, {
        email,
        password
    });
}

export function refresh(request) {
    axios.post(process.env.VUE_APP_REFRESH_BACKEND_ROUTE)
        .then(res => {
            storeToken(res.data.access_token)

            return axios.request(request.config)            
        })
        .catch(err => {
            return Promise.reject(err)
        })
}

