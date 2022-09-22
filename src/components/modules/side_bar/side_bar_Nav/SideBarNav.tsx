import React, { createRef, memo, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import classNameCheck from '../../../../scrtipts/classNameCheck';
import BaseProps from '../../../../types/BaseProps';
import LinkPage from '../../../UI/links/LinkPage';
import AuthLayout from '../../auth_layout/AuthLayout';
import SideBarPopupButton from '../side_bar_PopupButton/SideBarPopupButton';
import cl from './sideBarNav.module.css'

interface Props extends BaseProps {
}

const SideBarNav = memo(({ className, }: Props) => {

  const location = useLocation();
  const curPath = location.pathname;
  const [isLibraryDialogActive, setIsLibraryDialogActive] = useState(false);
  const libraryDialogRef = createRef<HTMLLIElement>();

  const library = useMemo(() => {
    return (
      <>
        <svg viewBox="0 0 512 512" width="28" height="28" xmlns="http://www.w3.org/2000/svg"><path d="M291.301 81.778l166.349 373.587-19.301 8.635-166.349-373.587zM64 463.746v-384h21.334v384h-21.334zM192 463.746v-384h21.334v384h-21.334z" fill="currentColor"></path></svg>
        <span>Your Library</span>
      </>
    )
  }, [])

  return (
    <nav className={`${cl.nav} ${classNameCheck(className)}`}>
      <ul>
        <li>
          <LinkPage
            to='/'
            isActive={curPath === '/'}
            className={`${cl.link}`}
          >
            <svg viewBox="0 0 512 512" width="28" height="28"><path d="M448 463.746h-149.333v-149.333h-85.334v149.333h-149.333v-315.428l192-111.746 192 110.984v316.19z" fill="currentColor"></path></svg>
            <span>Home</span>
          </LinkPage>
        </li>
        <li>
          <LinkPage
            to='/search'
            isActive={curPath === '/search'}
            className={`${cl.link}`}
          >
            <svg viewBox="0 0 512 512" width="28" height="28"><path d="M349.714 347.937l93.714 109.969-16.254 13.969-93.969-109.969q-48.508 36.825-109.207 36.825-36.826 0-70.476-14.349t-57.905-38.603-38.603-57.905-14.349-70.476 14.349-70.476 38.603-57.905 57.905-38.603 70.476-14.349 70.476 14.349 57.905 38.603 38.603 57.905 14.349 70.476q0 37.841-14.73 71.619t-40.889 58.921zM224 377.397q43.428 0 80.254-21.461t58.286-58.286 21.461-80.254-21.461-80.254-58.286-58.285-80.254-21.46-80.254 21.46-58.285 58.285-21.46 80.254 21.46 80.254 58.285 58.286 80.254 21.461z" fill="currentColor" fillRule="evenodd"></path></svg>
            <span>Search</span>
          </LinkPage>
        </li>
        
        <AuthLayout
          authed={
            <li>
              <LinkPage
                to='/library'
                isActive={curPath === '/library'}
                className={`${cl.link}`}
              >
                {library}
              </LinkPage>
            </li>
          }
          notAuthed={
            <li className={cl.popup} ref={libraryDialogRef}>
              <SideBarPopupButton
                isActive={isLibraryDialogActive}
                setActive={setIsLibraryDialogActive}
                rootRef={libraryDialogRef}
                title='Enjoy Your Library'
                text='Log in to see saved songs, podcasts, artists, and playlists in Your Library.'
                btnClassName={cl.link}
              >
                {library}
              </SideBarPopupButton>
            </li>
          }
        />
      </ul>
    </nav>
  )
})

export default SideBarNav