import axios from 'axios'
import { authHeader } from '../helpers/auth-header'
import { removeToken, storeToken } from '../helpers/local-storage'

const instance = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    responseType: 'json',
    headers: { 
      'Content-Type': 'application/json', 
      'Accept': 'application/json, text/plain, */*' 
    },
})

instance.interceptors.request.use(
  (request) => {
    if (request.url != process.env.VUE_APP_LOGIN_BACKEND_ROUTE) {
      request.headers['Authorization'] = authHeader()
    }
    return request
  }, (error) => {
    return Promise.reject(error)
})

instance.interceptors.response.use((response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  }, (error) => {
    
    if (error.config.url != process.env.VUE_APP_LOGIN_BACKEND_ROUTE && 
        error.config.url != process.env.VUE_APP_REFRESH_BACKEND_ROUTE && 
        error.response.status === 401 && 
        !error.config._retry) {
        error.config._retry = true
        
        return instance.post(process.env.VUE_APP_REFRESH_BACKEND_ROUTE)
            .then(res => {
                if (res.status === 200) {
                    storeToken(res.data.access_token)
 
                    return instance.request(error.config)
                } else {
                  removeToken()
                }
            })
            .catch(err=> console.log(err))
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  })

export default instance