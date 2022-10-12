import React, { createRef, memo, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom';
import classNameCheck from '../../../../scrtipts/classNameCheck';
import LinkPage from '../../../UI/links/LinkPage';
import SideBarPopupButton from '../side_bar_PopupButton/SideBarPopupButton';
import BaseProps from './../../../../types/BaseProps';
import cl from './sideBarUserMusicNav.module.css'
import AuthLayout from './../../auth_layout/AuthLayout';

interface Props extends BaseProps {

}

const SideBarUserMusicNav = memo(({ className, }: Props) => {

  const location = useLocation();
  const curPath = location.pathname;
  const [isPlaylistActive, setIsPlaylistActive] = useState(false);
  const playlistDialogRef = createRef<HTMLLIElement>();
  const [isLikedSongsDialogActive, setIsLikedSongsDialogActive] = useState(false);
  const likedSongsDialogRef = createRef<HTMLLIElement>();

  const CreatePlaylist = useMemo(() => {
    return (
      <>
        <span className={`${cl.icon} ${cl.playlist}`}>+</span>
        <span className={`${cl.text}`}>Create Playlist</span>
      </>
    )
  }, [])

  const LikedSongs = useMemo(() => {
    return (
      <>
        <span className={`${cl.icon} ${cl.likedSongs}`}>&#10084;</span>
        <span className={`${cl.text}`}>Liked Songs</span>
      </>
    )
  }, [])

  return (
    <div className={`${cl.userMusic} ${classNameCheck(className)}`}>
      <ul>
        <AuthLayout
          authed={
            <li>
              <LinkPage
                to='/playlists/create'
                isActive={curPath === '/playlists/create'}
                className={`${cl.link}`}
              >
                {CreatePlaylist}
              </LinkPage>
            </li>
          }
          notAuthed={
            <li className={cl.popup} ref={playlistDialogRef}>
              <SideBarPopupButton
                isActive={isPlaylistActive}
                setActive={setIsPlaylistActive}
                rootRef={playlistDialogRef}
                title='Create a playlist'
                text='Log in to create and share playlists.'
                btnClassName={cl.link}
              >
                {CreatePlaylist}
              </SideBarPopupButton>
            </li>
          }
        />

        <AuthLayout
          authed={
            <li>
              <LinkPage
                to='/songs'
                isActive={curPath === '/songs'}
                className={`${cl.link}`}
              >
                {LikedSongs}
              </LinkPage>
            </li>
          }
          notAuthed={
            <li className={cl.popup} ref={likedSongsDialogRef}>
              <SideBarPopupButton
                isActive={isLikedSongsDialogActive}
                setActive={setIsLikedSongsDialogActive}
                rootRef={likedSongsDialogRef}
                title='Enjoy Your Liked Songs'
                text='Log in to see all the songs you&rsquo;ve liked in one easy playlist.'
                btnClassName={cl.link}
              >
                {LikedSongs}
              </SideBarPopupButton>
            </li>
          }
        />
      </ul>
    </div>
  )
})

export default SideBarUserMusicNav