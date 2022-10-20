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
import mainRoutes from './../../../routes/mainRoutes';
import mobileChek from './../../../scrtipts/mobileCheck';

let timerId: NodeJS.Timeout;

const HeaderBar = memo(({ className }: BaseProps) => {
  const location = useLocation().pathname;
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate()
  const [marginRight, setMarginRight] = useState('0px')
  let observer = new MutationObserver(mutationRecords => {
    const main = mutationRecords[mutationRecords.length - 1].target as HTMLElement
    setMarginRight(main.scrollHeight > main.clientHeight? '13px' : '0px')    
  });

  const search = (e: React.FormEvent<HTMLInputElement>) => {
    clearTimeout(timerId)
    setSearchQuery(e.currentTarget.value)
    const query = e.currentTarget.value
    timerId = setTimeout(() => {
      navigate(`${mainRoutes.search}/${query}`, { replace: true })
    }, 500)
  }


  useEffect(() => {
    const path = location.split('/')
    const query = path.pop() || ''
    if (path.includes(mainRoutes.search.slice(1)))
      setSearchQuery(query)
  }, [location])

  useEffect(() => {
    const main = document.querySelector('main')
    if (main && !mobileChek(navigator, window)) observer.observe(main, { childList: true })

    return () => observer.disconnect()
  }, [])

  return (
    <header className={`${cl.header} ${classNameCheck(className)}`} style={{ marginRight: marginRight }}>
      <div className={cl.container}>
        <div className={cl.nav}>
          <ArrowBack className={cl.arrow} />
          <ArrowForward className={cl.arrow}/>
          <Routes>
            <Route
              path={mainRoutes.search}
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
            >
              <Route
                path=':id'
              />
            </Route>
          </Routes>
        </div>
        <AuthLayout
          authed={ <UserMenu/> }
          notAuthed={
            <div className={cl.auth}>
              <LinkButton to={mainRoutes.signup} style='transparent' className={cl.btn}>
                Sign up
              </LinkButton>
              <LinkButton to={mainRoutes.login} style='white' className={cl.btn}>
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