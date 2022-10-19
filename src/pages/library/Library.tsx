import React, { memo } from 'react'
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useAppSeletor } from '../../hooks/redux';
import libraryRoutes from './../../routes/libraryRoutes';
import LikedPlaylists from './../liked_playlists/LikedPlaylists';
import cl from './library.module.scss'
import mainRoutes from './../../routes/mainRoutes';

const Library = memo(() => {

  const curPath = useLocation().pathname;
  const { isAuth } = useAppSeletor(state => state.auth)

  if (!isAuth)
    return <Navigate to={mainRoutes.login} replace={true} />    
  console.log(curPath);
  
  return (
    <div className={cl.container}>
      <nav className={cl.nav}>
        <Link
          to={libraryRoutes.likedPlaylists}
          className={`${cl.link} ${curPath === mainRoutes.library || curPath === mainRoutes.library + '/' ? cl._active : ''}`}
        >
          Playlists
        </Link>
        <Link
          to={libraryRoutes.createdPlaylists}
          className={`${cl.link} ${curPath.split('/').pop() === libraryRoutes.createdPlaylists ? cl._active : ''}`}
        >
          Created Playlists
        </Link>
        <Link
          to={libraryRoutes.uploadedSongs}
          className={`${cl.link} ${curPath.split('/').pop() === libraryRoutes.uploadedSongs ? cl._active : ''}`}
        >
          Uploaded Songs
        </Link>
      </nav>
      <Routes>
        <Route path={libraryRoutes.likedPlaylists} element={<LikedPlaylists />} />
        <Route path={libraryRoutes.createdPlaylists} element={<h2>created playlists</h2>} />
        <Route path={libraryRoutes.uploadedSongs} element={<h2>uploaded songs</h2>} />
      </Routes>
    </div>
    
  )
})

export default Library
