import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from '../../../pages/home/Home'
import Search from '../../../pages/search/Search'
import classNameCheck from '../../../scrtipts/classNameCheck'
import BaseProps from '../../../types/BaseProps'
import cl from './main.module.css'
import NotFound from './../../../pages/not_found/NotFound';
import Playlist from '../../../pages/playlist/Playlist'
import Section from './../../../pages/section/Section';
import LogIn from './../../../pages/logIn/LogIn';
import SignUp from './../../../pages/signUp/SignUp';

const Main = ({ className }: BaseProps) => {
  return (
    <main className={`${cl.main} ${classNameCheck(className)}`}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Navigate to='/' replace />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/search' element={<Search />} />
        <Route path='/section/:id' element={<Section/>} />
        <Route path='/playlist/:id' element={<Playlist />} />
        <Route path='*' element={<NotFound />} />
      </Routes>   
    </main>
    
  )
}

export default Main