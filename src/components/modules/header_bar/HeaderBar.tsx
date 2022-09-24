import React, { memo, useState } from 'react';
import BaseProps from '../../../types/BaseProps';
import ArrowForward from '../../UI/arrows/forward/ArrowForward';
import cl from './headerBar.module.css';
import ArrowBack from './../../UI/arrows/back/ArrowBack';
import classNameCheck from './../../../scrtipts/classNameCheck';
import LinkButton from './../../UI/links/LinkButton';
import { Route, Routes } from 'react-router-dom';
import Input from './../../UI/inputs/Input';
import AuthLayout from './../auth_layout/AuthLayout';
import UserMenu from './user_menu/UserMenu';
import { useAppSeletor } from '../../../hooks/redux';

const HeaderBar = memo(({ className }: BaseProps) => {

  const {prevPath, nextPath} = useAppSeletor(state => state.path)
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className={`${cl.header} ${classNameCheck(className)}`}>
      <div className={cl.container}>
        <div className={cl.nav}>
          <ArrowBack isActive={prevPath.length ? true : false} className={cl.arrow} />
          <ArrowForward isActive={nextPath.length ? true : false} className={cl.arrow}/>
          <Routes>
            <Route 
              path='/search' 
              element={
                <form 
                  role={'serach'}
                  className={cl.form}
                >
                  <Input
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.currentTarget.value)}
                    placeholder='Artists, songs or podcasts'
                    style='search'
                  />
                </form>
              }
            />
          </Routes>
        </div>
        <AuthLayout
          authed={ <UserMenu/> }
          notAuthed={
            <div className={cl.auth}>
              <LinkButton to='signup' style='transparent' className={cl.btn}>
                Sign up
              </LinkButton>
              <LinkButton to='login' style='white' className={cl.btn}>
                Log in
              </LinkButton>
            </div>
          }
        />
      </div>
    </header>
  )
})

export default HeaderBar;