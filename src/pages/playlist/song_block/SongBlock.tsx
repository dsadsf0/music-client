import React, { memo, useEffect } from 'react'
import cl from './songBlock.module.scss'
import classNameCheck from '../../../scrtipts/classNameCheck'
import BaseProps from '../../../types/BaseProps'
import ISong from './../../../types/ISong';
import { API_URL } from '../../../API';
import { useAppDispatch, useAppSeletor } from '../../../hooks/redux';
import LinkStd from './../../../components/UI/links/LinkStd';
import UserService from './../../../API/UserService';
import { authSlice } from '../../../store/reducers/AuthSlice';

interface Props extends BaseProps {
  song: ISong,
  index?: number,
  playlistCover: string,
  playTrack: (song: ISong) => void
  isActive: boolean
}

const SongBlock = memo(({ className, index, song, playlistCover, playTrack, isActive }: Props) => {

  const { isAuth, user } = useAppSeletor(state => state.auth)
  const dispatch = useAppDispatch()

  const like = async (e: React.MouseEvent) => {
    e.stopPropagation()    
    const res = await UserService.likeSong(user.id, song._id)
    if (user.likedSongs.indexOf(song._id) === -1) {
      dispatch(authSlice.actions.setUser({...user, likedSongs: [...user.likedSongs, song._id] }))
    } else {
      dispatch(authSlice.actions.setUser({ ...user, likedSongs: user.likedSongs.filter(item => item !== song._id) }))
    }
  }

  if (!isAuth) return (
    <LinkStd
      to='/login'
      className={`${cl.container} ${classNameCheck(className)}`}
    >
      <div className={cl.index}>{index}</div>
      <div className={cl.info}>
        <div
          className={cl.info__cover}
          style={{ backgroundImage: `url(${API_URL}/covers/${song?.cover || playlistCover})` }}
        >
        </div>
        <div className={cl.info__text}>
          <div className={cl.info__name}>{song.name}</div>
          <div className={cl.info__author}>{song.author}</div>
        </div>
      </div>
    </LinkStd>
  )

  return (
    <div 
      className={`${cl.container} ${classNameCheck(className)} ${isActive ? cl._active : ''}`}
      onClick={() => playTrack(song)}
    >
      <div className={cl.index}>{index}</div>
      <div className={cl.info}>
        <div 
          className={cl.info__cover}
          style={{ backgroundImage: `url(${API_URL}/covers/${song?.cover || playlistCover})` }}
        >
        </div>
        <div className={cl.info__text}>
          <div className={cl.info__name}>{song.name}</div>
          <div className={cl.info__author}>{song.author}</div>
        </div>
      </div>
      <div>
        {
          user.likedSongs.indexOf(song._id) !== -1 ? <p>liked</p> : null
        }
        <button onClick={(e: React.MouseEvent) => {like(e)}}>
          like
        </button>
      </div>
    </div>
  )
})

export default SongBlock