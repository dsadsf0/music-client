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

const Main = ({ className }: BaseProps) => {
  return (
    <main className={`${cl.main} ${classNameCheck(className)}`}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Navigate to='/' replace={true} />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/search' element={<Genres />} />
        <Route path='/search/:query' element={<Search />} />
        <Route path='/section/:id' element={<Section/>} />
        <Route path='/playlist/:id' element={<Playlist />} />
        <Route path='/playlists' element={<LikedPlaylists />} />
        <Route path='/playlists/create' element={<CreatePlaylist />} />
        <Route path='/songs' element={<LikedSongs/> } />
        <Route path='*' element={<NotFound />} />
      </Routes>   
    </main>
    
  )
}

export default Main