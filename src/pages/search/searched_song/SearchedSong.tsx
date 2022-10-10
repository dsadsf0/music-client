import React, { memo } from 'react'
import { API_URL } from '../../../API'
import LinkStd from '../../../components/UI/links/LinkStd'
import { useAppSeletor } from '../../../hooks/redux'
import classNameCheck from '../../../scrtipts/classNameCheck'
import BaseProps from '../../../types/BaseProps'
import ISong from '../../../types/ISong'
import cl from './searchedSong.module.scss'

interface Props extends BaseProps {
  song: ISong,
  playTrack: (song: ISong) => void,
  isActive: boolean,
}

const SearchedSong = memo(({ song, className, playTrack, isActive }: Props) => {

  const { isAuth } = useAppSeletor(state => state.auth)
  const { currentSong } = useAppSeletor(state => state.player)

  if (!isAuth) return (
    <LinkStd
      to='/login'
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
    </div>
  )
})

export default SearchedSong