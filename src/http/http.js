import axios from 'axios'
import { authHeader } from '../helpers/auth-header'
import { removeToken, storeToken } from '../helpers/local-storage'

let skippedUrls = process.env.VUE_APP_SKIPPED_AUTH_URLS.split(',')
console.log(skippedUrls)

const instance = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    responseType: 'json',
    headers: { 'Content-Type': 'application/json' },
})

instance.interceptors.request.use(
  (request) => {
    if (!skippedUrls.includes(request.url)) {
      request.headers['Authorization'] = authHeader()
    }
    return request
  }, (error) => {
    return Promise.reject(error)
})

instance.interceptors.response.use((response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, (error) => {

    
    console.log('original', error.config);

    if (error.config.url != 'auth/login' && error.config.url != 'auth/refresh' && error.response.status === 401 && !error.config._retry) {
        console.log('entrou')
        console.log(error.config)
        error.config._retry = true;
        console.log(error.config)
        return instance.post('auth/refresh')
            .then(res => {
                console.log('entrou refresh')
                console.log(res)
                if (res.status === 200) {
                  console.log('entrou 200')
                    // 1) put token to LocalStorage
                    storeToken(res.data.access_token);
 
                    // 2) return originalRequest object with Axios.
                    return instance.request(error.config);
                } else {
                  console.log('else')
                  console.log(res.status)
                  removeToken()
                }
            })
            .catch(errr=> console.log('err refresh', errr, errr.response))
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

export default instance