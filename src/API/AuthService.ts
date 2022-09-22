import api, { API_URL } from ".";
import IAuthResponse from './../types/IAuthResponse';

export default class AuthService {
  static async signup(email: string, password: string, username: string) {
    return await api.post<IAuthResponse>(`${API_URL}/api/signup`, { user: { email, password, username, } })
  }

  static async login(username: string, password: string) {
    return await api.post<IAuthResponse>(`${API_URL}/api/login`, { username, password })
  }

  static async logout() {
    return await api.post(`${API_URL}/api/logout`)
  }

}