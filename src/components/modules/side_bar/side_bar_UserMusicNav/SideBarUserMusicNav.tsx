import React, { createRef, memo, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom';
import classNameCheck from '../../../../scrtipts/classNameCheck';
import LinkPage from '../../../UI/links/LinkPage';
import SideBarPopupButton from '../side_bar_PopupButton/SideBarPopupButton';
import BaseProps from './../../../../types/BaseProps';
import cl from './sideBarUserMusicNav.module.css'
import AuthLayout from './../../auth_layout/AuthLayout';
import mainRoutes from '../../../../routes/mainRoutes';

interface Props extends BaseProps {

}

const SideBarUserMusicNav = memo(({ className, }: Props) => {

  const curPath = useLocation().pathname;
  const [isPlaylistActive, setIsPlaylistActive] = useState(false);
  const playlistDialogRef = createRef<HTMLLIElement>();
  const [isLikedSongsDialogActive, setIsLikedSongsDialogActive] = useState(false);
  const likedSongsDialogRef = createRef<HTMLLIElement>();

  const CreatePlaylist = useMemo(() => {
    return (
      <>
        <span className={`${cl.icon} ${cl.playlist}`}>
          <svg width="0px" height="0px" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
          </svg>
        </span>
        <span className={`${cl.text}`}>Create Playlist</span>
      </>
    )
  }, [])

  const LikedSongs = useMemo(() => {
    return (
      <>
        <span className={`${cl.icon} ${cl.likedSongs}`}>
          <svg className={cl.inner} x="0px" y="0px" viewBox="0 0 612 792">
            <path d="M611.721,288.299c-2.258-42.176-20.114-81.782-50.287-111.524c-30.557-30.119-70.43-46.708-112.27-46.708
          c-62.267,0-107.396,49.233-131.641,75.684c-3.743,4.085-8.13,8.87-11.183,11.79c-2.444-2.529-5.756-6.3-8.803-9.768
          c-22.142-25.222-68.223-77.704-134.688-77.704c-41.84,0-81.711,16.588-112.268,46.708C20.408,206.517,2.547,246.121,0.29,288.299
          c-2.248,42.107,8.521,78.746,34.92,118.803c20.888,31.701,75.961,93.605,133.927,150.543c29.856,29.326,57.336,54.18,79.466,71.873
          c35.936,28.729,49.7,32.413,57.674,32.413c7.476,0,21.614-3.352,57.895-32.332c22.079-17.637,49.463-42.451,79.194-71.76
          c57.445-56.63,112.318-118.617,133.443-150.743C594.576,380.072,614.6,342.151,611.721,288.299z"
            />
          </svg>
        </span>
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
                to={`${mainRoutes.upload}`}
                isActive={curPath.includes(mainRoutes.upload)}
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
                to={mainRoutes.likedSongs}
                isActive={curPath === mainRoutes.likedSongs}
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