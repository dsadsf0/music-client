import React, { memo, useEffect, useState } from 'react'
import cl from './signUp.module.css'
import Input from './../../components/UI/inputs/Input';
import ButtonSTD from '../../components/UI/buttons/ButtonSTD';
import AuthCreators from '../../store/actionCreators/AuthCreators';
import { useAppDispatch, useAppSeletor } from './../../hooks/redux';
import { Navigate } from 'react-router-dom';

const SignUp = memo(() => {

  const { Error, isAuth } = useAppSeletor(state => state.auth)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useAppDispatch();
  const signup = AuthCreators.Signup;

  useEffect(() => {
    dispatch(AuthCreators.clearErrors())
  }, [])
  
  if (isAuth) return <Navigate to={'/'} replace={true}/>

  return (
    <div className={cl.container}>
      <form className={cl.form}>
        <div >
          <div className={cl.inputBlock}>
            <span className={cl.title}>What's your email?</span>
            <Input
              className={`${cl.input} ${Error.email?.length ? cl.error : ''}`}
              value={email}
              onChange={e => setEmail(e.currentTarget.value)}
              placeholder='email'
              type='email'
            />
            {
              Error.email?.map(msg =>
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
            <span className={cl.title}>What's your passsword?</span>
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
          <div className={cl.inputBlock}>
            <span className={cl.title}>What's your username?</span>
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
        </div>
        <ButtonSTD
          className={cl.btn}
          style='base'
          onClick={() => dispatch(signup(email, password, username))}
        >
          sign up
        </ButtonSTD>
      </form>
    </div>
  )
})

export default SignUp