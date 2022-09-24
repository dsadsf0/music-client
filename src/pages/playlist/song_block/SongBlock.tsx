import React, { memo } from 'react'
import cl from './songBlock.module.scss'
import classNameCheck from '../../../scrtipts/classNameCheck'
import BaseProps from '../../../types/BaseProps'
import ISong from './../../../types/ISong';
import { API_URL } from '../../../API';
import { useAppSeletor } from '../../../hooks/redux';
import { Link } from 'react-router-dom';
import { useSyncLinkToArrowNav } from '../../../hooks/syncLinkToArrowNav';

interface Props extends BaseProps {
  song: ISong,
  index?: number,
  playlistCover: string,
  playTrack: (song: ISong) => void
}

const SongBlock = memo(({className, index, song, playlistCover, playTrack}: Props) => {

  const sync = useSyncLinkToArrowNav();
  const { isAuth } = useAppSeletor(state => state.auth)

  if (!isAuth) return (
    <Link
      to='/login'
      className={`${cl.container} ${classNameCheck(className)}`}
      onClick={sync}
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
    </Link>
  )

  return (
    <div 
      className={`${cl.container} ${classNameCheck(className)}`}
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