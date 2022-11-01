import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from '../../../pages/home/Home'
import Genres from '../../../pages/genres/Genres'
import classNameCheck from '../../../scrtipts/classNameCheck'
import BaseProps from '../../../types/BaseProps'
import cl from './main.module.css'
import NotFound from './../../../pages/not_found/NotFound';
import Playlist from '../../../pages/playlist/Playlist'
import Section from './../../../pages/section/Section';
import LogIn from './../../../pages/logIn/LogIn';
import SignUp from './../../../pages/signUp/SignUp';
import Search from './../../../pages/search/Search';
import LikedSongs from '../../../pages/liked_songs/LikedSongs'
import mainRoutes from '../../../routes/mainRoutes'
import uploadRoutes from './../../../routes/uploadRoutes';
import Library from '../../../pages/library/Library'
import libraryRoutes from '../../../routes/libraryRoutes'
import Upload from '../../../pages/upload/Upload'

const Main = ({ className }: BaseProps) => {
  
  return (
    <main className={`${cl.main} ${classNameCheck(className)}`}>
      <Routes>
        <Route path={mainRoutes.home} element={<Home />} />
        <Route path='home' element={<Navigate to={mainRoutes.home} replace={true} />} />
        <Route path={mainRoutes.login} element={<LogIn />} />
        <Route path={mainRoutes.signup} element={<SignUp />} />
        <Route path={mainRoutes.search} element={<Genres />} />
        <Route path={`${mainRoutes.search}/:query`} element={<Search />} />
        <Route path={`${mainRoutes.section}/:id`} element={<Section/>} />
        <Route path={`${mainRoutes.playlist}/:id`} element={<Playlist />} />
        <Route path={mainRoutes.library} element={<Library />} >
          <Route path={libraryRoutes.likedPlaylists} />
          <Route path={libraryRoutes.createdPlaylists} />
          <Route path={libraryRoutes.uploadedSongs} />
        </Route>
        <Route path={mainRoutes.upload} element={<Upload/>}>
          <Route path={uploadRoutes.intro} />
          <Route path={uploadRoutes.playlist} />
          <Route path={uploadRoutes.song} />
        </Route>
        <Route path={mainRoutes.likedSongs} element={<LikedSongs/> } />
        <Route path='*' element={<NotFound />} />
      </Routes>   
    </main>
  )
}

export default Main