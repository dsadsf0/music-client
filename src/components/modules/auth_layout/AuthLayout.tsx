import React from 'react'
import { useAppSeletor } from '../../../hooks/redux';

interface Props {
  authed: React.ReactElement;
  notAuthed: React.ReactElement;
}

const AuthLayout = ({ authed, notAuthed }: Props) => {
  const {isAuth} = useAppSeletor(state => state.auth)

  return (
    <>
      {
        isAuth
          ? authed
          : notAuthed
      }
    </>
  )
}

export default AuthLayout
