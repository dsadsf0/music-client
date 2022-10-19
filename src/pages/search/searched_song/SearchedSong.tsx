import React, { memo } from 'react'
import { API_URL } from '../../../API'
import UserService from '../../../API/UserService'
import LikeButton from '../../../components/UI/buttons/LikeButton'
import LinkStd from '../../../components/UI/links/LinkStd'
import { useAppDispatch, useAppSeletor } from '../../../hooks/redux'
import classNameCheck from '../../../scrtipts/classNameCheck'
import { authSlice } from '../../../store/reducers/AuthSlice'
import BaseProps from '../../../types/BaseProps'
import ISong from '../../../types/ISong'
import cl from './searchedSong.module.scss'
import mainRoutes from './../../../routes/mainRoutes';

interface Props extends BaseProps {
  song: ISong,
  playTrack: (song: ISong) => void,
  isActive: boolean,
}

const SearchedSong = memo(({ song, className, playTrack, isActive }: Props) => {

  const { isAuth, user } = useAppSeletor(state => state.auth)
  const dispatch = useAppDispatch()

  const like = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!user.likedSongs.includes(song._id)) {
      dispatch(authSlice.actions.addLikedSong(song._id))
    } else {
      dispatch(authSlice.actions.removeLikedSong(song._id))
    }
    UserService.likeSong(song._id)
  }

  if (!isAuth) return (
    <LinkStd
      to={mainRoutes.login}
      className={`${cl.container} ${classNameCheck(className)}`}
    >
      <div className={cl.info}>
        <div
          className={cl.info__cover}
          style={{ backgroundImage: `url(${API_URL}/covers/${song?.cover})` }}
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
      <div className={cl.info}>
        <div
          className={cl.info__cover}
          style={{ backgroundImage: `url(${API_URL}/covers/${song?.cover})` }}
        >
        </div>
        <div className={cl.info__text}>
          <div className={cl.info__name}>{song.name}</div>
          <div className={cl.info__author}>{song.author}</div>
        </div>
      </div>
      <LikeButton
        className={cl.likeBtn}
        isActive={user.likedSongs.includes(song._id)}
        like={like}
      />
    </div>
  )
})

export default SearchedSong