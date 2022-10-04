import React, { memo, useEffect, useState } from 'react'
import { useAppDispatch, useAppSeletor } from '../../hooks/redux'
import AuthCreators from '../../store/actionCreators/AuthCreators'
import cl from './logIn.module.css'
import Input from '../../components/UI/inputs/Input'
import ButtonSTD from '../../components/UI/buttons/ButtonSTD'
import { Navigate } from 'react-router-dom'

const LogIn = memo(() => {

  const { Error, isAuth } = useAppSeletor(state => state.auth)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  

  const dispatch = useAppDispatch();
  const login = AuthCreators.Login;

  useEffect(() => {
    dispatch(AuthCreators.clearErrors())
  }, [])

  if (isAuth) return <Navigate to={'/'} replace = {true}/> 
 
  return (
    <div className={cl.container}>
      <form className={cl.form}>
        <div>
          <div className={cl.inputBlock}>
            <span className={cl.title}>Enter your username</span>
            <Input
              className={`${cl.input} ${Error.username?.length ? cl.error : ''}`}
              value={username}
              onChange={e => setUsername(e.currentTarget.value)}
              placeholder='username'
            />
            {
              Error.username?.map(msg =>
                <span
                  key={msg}
                  className={cl.errMsg}
                >
                  {msg}
                </span>
              )
            }
          </div>
          <div className={cl.inputBlock}>
            <span className={cl.title}>Enter your passsword</span>
            <Input
              className={`${cl.input} ${Error.password?.length ? cl.error : ''}`}
              value={password}
              onChange={e => setPassword(e.currentTarget.value)}
              placeholder='password'
              type='password'
            />
            {
              Error.password?.map(msg =>
                <span
                  key={msg}
                  className={cl.errMsg}
                >
                  {msg}
                </span>
              )
            }
          </div>
        </div>
        <ButtonSTD
          className={cl.btn}
          style='base'
          onClick={() => dispatch(login(username, password))}
        >
          Log in
        </ButtonSTD>
      </form>
    </div>
  )
})

export default LogIn