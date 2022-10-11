import React, { createRef, memo, useEffect, useState } from 'react'
import ButtonSTD from '../../../UI/buttons/ButtonSTD'
import Dialog from '../../../UI/dialog/Dialog'
import cl from './userMenu.module.css'
import { useAppDispatch, useAppSeletor } from '../../../../hooks/redux';
import AuthCreators from '../../../../store/actionCreators/AuthCreators';
import classNameCheck from '../../../../scrtipts/classNameCheck';
import BaseProps from './../../../../types/BaseProps';
import LinkButton from './../../../UI/links/LinkButton';

const UserMenu = memo(({ className }:BaseProps) => {
  const { user } = useAppSeletor(state => state.auth)
  const [isUserDialogActive, setIsUserDialogActive] = useState(false)
  const dispatch = useAppDispatch();
  const logout = AuthCreators.Logout;
  const userDialogRef = createRef<HTMLDivElement>();

  const btnClick = () => {
    setIsUserDialogActive(false)
  }

  useEffect(() => {
    function listener(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const ref = userDialogRef.current as HTMLElement;
      
      if (!(ref.compareDocumentPosition(target) & 16)) setIsUserDialogActive(false);
    };

    document.body.addEventListener('click', listener);
    return function cleanup() { document.body.removeEventListener('click', listener) };
  }, [userDialogRef]);
  
  return (
    <div
      className={`${cl.user} ${classNameCheck(className)}`}
      onClick={() => setIsUserDialogActive(prev => !prev)}
      ref={userDialogRef}
    >
      <div className={`${cl.username} ${classNameCheck(cl[isUserDialogActive ? '_active' : ''])}`}>
        {user.username}
      </div>
      <Dialog
        className={`${cl.userPopup} ${classNameCheck(cl[isUserDialogActive ? '_active' : ''])}`}
        isActive={isUserDialogActive}
      >
        <LinkButton
          style='base'
          to='/library'
          className={cl.userbtn}
          onClick={btnClick}
        >
          Library
        </LinkButton>
        <LinkButton
          style='base'
          to='/playlists'
          className={cl.userbtn}
          onClick={btnClick}
        >
          Your Playlists
        </LinkButton>
        <LinkButton
          style='base'
          to='/liked'
          className={cl.userbtn}
          onClick={btnClick}
        >
          Liked songs
        </LinkButton>
        <ButtonSTD
          style='base'
          className={cl.userbtn}
          onClick={() => {
            dispatch(logout())
            btnClick();
          }}
        >
          Log out
        </ButtonSTD>
      </Dialog>
    </div>
  )
})

export default UserMenu

