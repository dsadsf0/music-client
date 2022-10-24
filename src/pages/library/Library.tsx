import React, { memo } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useAppSeletor } from '../../hooks/redux';
import libraryRoutes from './../../routes/libraryRoutes';
import LikedPlaylists from './liked_playlists/LikedPlaylists';
import cl from './library.module.scss'
import mainRoutes from './../../routes/mainRoutes';
import LinkStd from './../../components/UI/links/LinkStd';
import UploadedSongs from './uploaded_songs/UploadedSongs';
import CreatedPlaylists from './created_playlists/CreatedPlaylists';

const Library = memo(() => {

  const curPath = useLocation().pathname;
  const { isAuth } = useAppSeletor(state => state.auth)

  const scrollUp = () => {
    const main = document.querySelector('main')
    if (main) main.scrollTo(0, 0)
  }

  if (!isAuth)
    return <Navigate to={mainRoutes.login} replace={true} />
  
  return (
    <div className={cl.container}>
      <nav className={cl.nav}>
        <LinkStd
          to={libraryRoutes.likedPlaylists}
          className={`${cl.link} ${curPath === mainRoutes.library || curPath === mainRoutes.library + '/' ? cl._active : ''}`}
          onClick={scrollUp}
        >
          Playlists
        </LinkStd>
        <LinkStd
          to={libraryRoutes.createdPlaylists}
          className={`${cl.link} ${curPath.split('/').pop() === libraryRoutes.createdPlaylists ? cl._active : ''}`}
          onClick={scrollUp}
        >
          Created Playlists
        </LinkStd>
        <LinkStd
          to={libraryRoutes.uploadedSongs}
          className={`${cl.link} ${curPath.split('/').pop() === libraryRoutes.uploadedSongs ? cl._active : ''}`}
          onClick={scrollUp}
        >
          Uploaded Songs
        </LinkStd>
      </nav>
      <div className={cl.content}>
        <Routes>
          <Route path={libraryRoutes.likedPlaylists} element={<LikedPlaylists />} />
          <Route path={libraryRoutes.createdPlaylists} element={<CreatedPlaylists/>} />
          <Route path={libraryRoutes.uploadedSongs} element={<UploadedSongs />} />
        </Routes>
      </div>
    </div>
    
  )
})

export default Library
