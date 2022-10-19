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
import LikedPlaylists from './../../../pages/liked_playlists/LikedPlaylists';
import CreatePlaylist from '../../../pages/create_song_playlist/CreatePlaylist'
import MainRoutes from '../../../routes/MainRoutes'

const Main = ({ className }: BaseProps) => {
  
  return (
    <main className={`${cl.main} ${classNameCheck(className)}`}>
      <Routes>
        <Route path={MainRoutes.home} element={<Home />} />
        <Route path='home' element={<Navigate to={MainRoutes.home} replace={true} />} />
        <Route path={MainRoutes.login} element={<LogIn />} />
        <Route path={MainRoutes.signup} element={<SignUp />} />
        <Route path={MainRoutes.search} element={<Genres />} />
        <Route path={MainRoutes.searchQuery} element={<Search />} />
        <Route path={MainRoutes.sectionId} element={<Section/>} />
        <Route path={MainRoutes.playlistId} element={<Playlist />} />
        <Route path='collection/playlists/liked' element={<LikedPlaylists />} />
        <Route path={MainRoutes.createPlaylist} element={<CreatePlaylist />} />
        <Route path='collection/songs/liked' element={<LikedSongs/> } />
        <Route path='*' element={<NotFound />} />
      </Routes>   
    </main>
  )
}

export default Main