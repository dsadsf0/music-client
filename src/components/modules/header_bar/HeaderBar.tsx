import React, { memo, useEffect, useState } from 'react';
import BaseProps from '../../../types/BaseProps';
import ArrowForward from '../../UI/arrows/forward/ArrowForward';
import cl from './headerBar.module.css';
import ArrowBack from './../../UI/arrows/back/ArrowBack';
import classNameCheck from './../../../scrtipts/classNameCheck';
import LinkButton from './../../UI/links/LinkButton';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import AuthLayout from './../auth_layout/AuthLayout';
import UserMenu from './user_menu/UserMenu';
import SearchInput from './../../UI/inputs/SearchInput';

let timerId: NodeJS.Timeout;

const HeaderBar = memo(({ className }: BaseProps) => {
  const location = useLocation().pathname;
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate()

  const search = (e: React.FormEvent<HTMLInputElement>) => {
    clearTimeout(timerId)
    setSearchQuery(e.currentTarget.value)
    const query = e.currentTarget.value
    timerId = setTimeout(() => {
      navigate(`/search/${query}`, { replace: true })
    }, 500)
  }

  const clearQuery = () => {
    setSearchQuery('')
  }

  useEffect(() => {
    if ((location.split('/')[location.split('/').length - 1] === 'search')) clearQuery()
  }, [location])

  return (
    <header className={`${cl.header} ${classNameCheck(className)}`}>
      <div className={cl.container}>
        <div className={cl.nav}>
          <ArrowBack className={cl.arrow} />
          <ArrowForward className={cl.arrow}/>
          <Routes>
            <Route
              path='/search'
              element={
                <form
                  role={'serach'}
                  className={cl.form}
                  onSubmit={e => {e.preventDefault()}}
                >
                  <SearchInput
                    value={searchQuery}
                    setValue={setSearchQuery}
                    onChange={search}
                    placeholder='Artists, songs or podcasts'
                  />
                </form>
              }
            />
            <Route 
              path='/search/:query' 
              element={
                <form 
                  role={'serach'}
                  className={cl.form}
                  onSubmit={e => { e.preventDefault() }}
                >
                  <SearchInput
                    value={searchQuery}
                    setValue={setSearchQuery}
                    onChange={search}
                    placeholder='Artists, songs or podcasts'
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