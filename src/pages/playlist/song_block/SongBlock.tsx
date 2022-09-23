import React, { memo } from 'react'
import cl from './songBlock.module.scss'
import classNameCheck from '../../../scrtipts/classNameCheck'
import BaseProps from '../../../types/BaseProps'
import ISong from './../../../types/ISong';
import { API_URL } from '../../../API';

interface Props extends BaseProps {
  song: ISong,
  index?: number,
  playlistCover: string
}

const SongBlock = memo(({className, index, song, playlistCover}: Props) => {
  return (
    <div className={`${cl.container} ${classNameCheck(className)}`}>
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