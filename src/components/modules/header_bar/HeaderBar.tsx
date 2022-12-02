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
import mobileCheck from './../../../scrtipts/mobileCheck';

let timerId: NodeJS.Timeout;

const HeaderBar = memo(({ className }: BaseProps) => {
  const location = decodeURIComponent(useLocation().pathname);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate()
  const [marginRight, setMarginRight] = useState('0px')
  let observer = new MutationObserver(mutationRecords => {
    const target = mutationRecords[mutationRecords.length - 1].target as HTMLElement
    const main = target.closest('main') as HTMLElement
    
    setMarginRight(main.scrollHeight > main.clientHeight? '13px' : '0px')    
  });

  const search = (e: React.FormEvent<HTMLInputElement>) => {
    clearTimeout(timerId)
    setSearchQuery(e.currentTarget.value)
    const query = e.currentTarget.value
    timerId = setTimeout(() => {
      navigate(`${mainRoutes.search}/${encodeURIComponent(query)}`, { replace: true })
    }, 500)
  }

  useEffect(() => {
    if (location.includes(mainRoutes.search) && location !== mainRoutes.search) {
      const query = location.replace(`${mainRoutes.search}/`, '')
      setSearchQuery(query)
    }
    else 
      setSearchQuery('')
  }, [location])

  useEffect(() => {
    const main = document.querySelector('main')
    if (main && !mobileCheck(navigator, window)) observer.observe(main, { childList: true, subtree: true})

    return () => observer.disconnect()
  }, [])

  return (
    <header className={`${cl.header} ${classNameCheck(className)}`} style={{ marginRight: marginRight }}>
      <div className={cl.container}>
        <div className={cl.nav}>
          <ArrowBack className={cl.arrow} />
          <ArrowForward className={cl.arrow}/>
          {
            mobileCheck(navigator, window) 
            ?
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
            :
              <Routes>
                <Route
                  path={mainRoutes.search}
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
                >
                  <Route
                    path=':id'
                  />
                </Route>
              </Routes>
          }
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