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
    console.log('request')
    console.log(request)
    if (!skippedUrls.includes(request.url)) {
      console.log('add header')
      request.headers['Authorization'] = 'Bearer ' + authHeader
    }
    return request
  }, (error) => {
    console.log('erro request')
    return Promise.reject(error)
})

instance.interceptors.response.use((response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log('resposta')
    console.log(response)
    return response;
  }, (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log('erro resposta')
    console.log(error.response)
    return Promise.reject(error);
  });

export default instance