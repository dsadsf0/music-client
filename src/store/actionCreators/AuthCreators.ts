import { AppDispatch } from "../store";
import { authSlice } from './../reducers/AuthSlice';
import AuthService from './../../API/AuthService';
import IUser from "./../../types/IUser";
import IAuthError from './../../types/IAuthError';
import axios from 'axios';
import IAuthResponse from "../../types/IAuthResponse";
import { API_URL } from "../../API";
import { pathSlice } from "../reducers/PathSlice";

export default class AuthCreators {

  static Login = (username: string, password: string) => async (dispatch: AppDispatch) => {
    const errs: IAuthError = {
      email: [],
      password: [],
      username: []
    }
    try {
      const response = await AuthService.login(username, password)
      localStorage.setItem('token', response.data.accessToken)
      dispatch(authSlice.actions.setAuth(true))
      dispatch(authSlice.actions.setUser(response.data.user))
      dispatch(authSlice.actions.setError(errs))
      dispatch(pathSlice.actions.clearPrev())
    } catch (error: any) {
      if (typeof error.response.data === 'string') {
        if (error.response.data.toLowerCase().indexOf('email') !== -1)
          errs.email.push(error.response.data)

        if (error.response.data.toLowerCase().indexOf('password') !== -1)
          errs.password.push(error.response.data)

        if (error.response.data.toLowerCase().indexOf('username') !== -1)
          errs.username.push(error.response.data)
      } else {
        if (error.response?.data[Symbol.iterator])
          for (const item of error.response?.data) {
            switch (item.param) {
              case 'email':
                errs.email.push(item.msg)
                break;
              case 'password':
                errs.password.push(item.msg)
                break;
              case 'username':
                errs.username.push(item.msg)
                break;
              default:
                break;
            }
        }
      }
    }finally{
      dispatch(authSlice.actions.setError(errs))
    }
  }

  static Signup = (email: string, password: string, username: string) => async (dispatch: AppDispatch) => {
    const errs: IAuthError = {
      email: [],
      password: [],
      username: []
    }
    try {
      const response = await AuthService.signup(email, password, username)
      localStorage.setItem('token', response.data.accessToken)
      dispatch(authSlice.actions.setAuth(true))
      dispatch(authSlice.actions.setUser(response.data.user))
      dispatch(pathSlice.actions.clearPrev())
    } catch (error: any) {
      if (typeof error.response.data === 'string')
      {
        if (error.response.data.toLowerCase().indexOf('email') !== -1)
          errs.email.push(error.response.data)
        
        if (error.response.data.toLowerCase().indexOf('password') !== -1)
          errs.password.push(error.response.data)  

        if (error.response.data.toLowerCase().indexOf('username') !== -1) 
          errs.username.push(error.response.data)          
      } else {
        if (error.response?.data[Symbol.iterator])
          for (const item of error.response?.data) {
            switch (item.param.split('.')[1]) {
              case 'email':
                errs.email.push(item.msg)
                break;
              case 'password':
                errs.password.push(item.msg)
                break;
              case 'username':
                errs.username.push(item.msg)
                break;
              default:
                break;
            }
          }
      }
    } finally {
      dispatch(authSlice.actions.setError(errs))
    }
  }

  static Logout = () => async (dispatch: AppDispatch) => {
    const errs: IAuthError = {
      email: [],
      password: [],
      username: []
    }
    try {
      await AuthService.logout()
      localStorage.removeItem('token')
      dispatch(authSlice.actions.setAuth(false))
      dispatch(authSlice.actions.setUser({} as IUser))
    } catch (error) {
      throw 'Logout error'
    } finally {
      dispatch(authSlice.actions.setError(errs))
    }
  }

  static checkAuth = () => async (dispatch: AppDispatch) => {
    dispatch(authSlice.actions.setLoading(true))
    try {
      const response = await axios.get<IAuthResponse>(`${API_URL}/api/refresh`, { withCredentials: true })
      localStorage.setItem('token', response.data.accessToken)
      dispatch(authSlice.actions.setAuth(true))
      dispatch(authSlice.actions.setUser(response.data.user))
    } catch (error) {
      throw 'Authorization error'
    } finally{
      dispatch(authSlice.actions.setLoading(false))
    }
  }

  static clearErrors = () => (dispatch: AppDispatch) => {
    dispatch(authSlice.actions.setError( {} as IAuthError))
  }
}