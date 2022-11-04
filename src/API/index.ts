import axios from "axios"
import IAuthResponse from "../types/IAuthResponse"

export const API_URL = 'http://109.195.234.64:3001'

const api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
})

api.interceptors.request.use( config => {
  config && config.headers && (config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`) 
  return config
})

api.interceptors.response.use(config => {
    return config
}, async (error) => {
  const originalRequest = error.config
  if(error.response.status === 401 && error.config && !error.config._isRetry) {
    originalRequest._isRetry = true
    try {
      const response = await axios.get<IAuthResponse>(`${API_URL}/api/refresh`, { withCredentials: true })
      localStorage.setItem('token', response.data.accessToken)
      return api.request(originalRequest)
    } catch (error) {
      console.log(error)
    }
  }
  throw error
})

export default api