import React, { memo } from 'react'
import cl from './songBlock.module.scss'
import classNameCheck from '../../../scrtipts/classNameCheck'
import BaseProps from '../../../types/BaseProps'
import ISong from './../../../types/ISong';
import { API_URL } from '../../../API';
import { useAppDispatch, useAppSeletor } from '../../../hooks/redux';
import LinkStd from './../../../components/UI/links/LinkStd';
import UserService from './../../../API/UserService';
import { authSlice } from '../../../store/reducers/AuthSlice';
import LikeButton from '../../../components/UI/buttons/LikeButton';
import mainRoutes from './../../../routes/mainRoutes';
import IPlaylist from './../../../types/IPlaylist';
import PlusButton from '../../../components/UI/buttons/PlusButton';
import MinusButton from '../../../components/UI/buttons/MinusButton';

interface Props extends BaseProps {
  song: ISong,
  index: number,
  playlist?: IPlaylist,
  playTrack: (song: ISong) => void,
  isActive: boolean,
  removeFromPlaylist?: (songId: string) => Promise<void>,
  addToPlaylist?: (song: ISong) => void
}

const SongBlock = memo(({ className, index, song, playlist, playTrack, isActive, addToPlaylist, removeFromPlaylist }: Props) => {

  const { isAuth, user } = useAppSeletor(state => state.auth)
  const dispatch = useAppDispatch()

  const like = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!user.likedSongs.some(item => item._id === song._id)) {
      dispatch(authSlice.actions.addLikedSong(song))
    } else {
      dispatch(authSlice.actions.removeLikedSong(song))
    }
    UserService.likeSong(song._id)
  }

  if (!isAuth) return (
    <LinkStd
      to={mainRoutes.login}
      className={`${cl.container} ${classNameCheck(className)}`}
    >
      <div className={cl.index}>{index}</div>
      <div className={cl.info}>
        <div
          className={cl.info__cover}
          style={{ backgroundImage: `url(${API_URL}/covers/${song?.cover || playlist?.cover})` }}
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
      onClick={(e: React.MouseEvent) => {
        const target = e.target as HTMLElement
        if (!target.closest('button')) playTrack(song)
      }}
    >
      <div className={cl.index}>{index}</div>
      <div className={cl.info}>
        <div 
          className={cl.info__cover}
          style={{ backgroundImage: `url(${API_URL}/covers/${song?.cover || playlist?.cover})` }}
        >
        </div>
        <div className={cl.info__text}>
          <div className={cl.info__name}>{song.name}</div>
          <div className={cl.info__author}>{song.author}</div>
        </div>
      </div>
      {
        user.createdPlaylists.some(item => item._id === playlist?._id) 
        ? <MinusButton 
            className={cl.songBtn}
            onClick={() => { removeFromPlaylist && removeFromPlaylist(song._id) }}
          />
        : <PlusButton 
            className={cl.songBtn}
            onClick={() => { addToPlaylist && addToPlaylist(song) }}
          />
      }
      <LikeButton
        className={cl.likeBtn}
        isActive={user.likedSongs.some(item => item._id === song._id)}
        like={like}
      />
    </div>
  )
})

export default SongBlock