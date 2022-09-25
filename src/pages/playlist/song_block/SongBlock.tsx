import React, { memo } from 'react'
import cl from './songBlock.module.scss'
import classNameCheck from '../../../scrtipts/classNameCheck'
import BaseProps from '../../../types/BaseProps'
import ISong from './../../../types/ISong';
import { API_URL } from '../../../API';
import { useAppSeletor } from '../../../hooks/redux';
import LinkStd from './../../../components/UI/links/LinkStd';

interface Props extends BaseProps {
  song: ISong,
  index?: number,
  playlistCover: string,
  playTrack: (song: ISong) => void
  isActive: boolean
}

const SongBlock = memo(({ className, index, song, playlistCover, playTrack, isActive }: Props) => {

  const { isAuth } = useAppSeletor(state => state.auth)

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
    </div>
  )
})

export default SongBlock