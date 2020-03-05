import axios from 'axios'
import { authHeader } from '../helpers/auth-header'

let skippedUrls = ['autenticar']

const instance = axios.create({
    baseURL: 'http://base.test/api/',
    responseType: 'json',
    headers: { 'Content-Type': 'application/json' },
})

instance.interceptors.request.use(
  (request) => {
    if (!skippedUrls.includes(request.url)) {
      request.headers['Authorization'] = 'Bearer ' + authHeader
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
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

export default instance