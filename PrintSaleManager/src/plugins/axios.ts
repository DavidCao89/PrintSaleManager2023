import { NCoreConfig } from '@/plugins/nservices/NCoreConfig'
import { refreshToken } from '@/plugins/refreshToken'
import axios from 'axios'

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL: 'https://localhost:5001/',

  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})

axiosIns.interceptors.request.use(config => {
  // Do something before request is sent
  return config
}, error => {
  // Do something with request error
  return Promise.reject(error)
})

axiosIns.interceptors.response.use(
  response => {
    return response
  },
  async error => {
    const originalRequest = error.config

    if (error.code === 'ERR_NETWORK') {
      localStorage.setItem(NCoreConfig.localError, 'Không có kết nối internet')
      NCoreConfig.showAlertError()
    }
    else {
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true

        const refreshResponse = await refreshToken(localStorage.getItem('refresh_token') ?? '')

        localStorage.setItem('access_token', refreshResponse.access_token)
        originalRequest.headers.Authorization = `Bearer ${refreshResponse.access_token}`

        return axios(originalRequest)
      }
      else {
        switch (error.response.status) {
        case 400: {
          localStorage.setItem(NCoreConfig.localError, error.response.data.errors)
          break
        }
        case 500: {
          alert(error.response.data.errors)
          break
        }
        default:
          localStorage.setItem(NCoreConfig.localError, 'Không thể kết nối đến internet của bạn')
          break
        }
        NCoreConfig.showAlertError()
      }
    }

    return Promise.reject(error)
  },
)
export default axiosIns
