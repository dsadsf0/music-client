import React, { memo } from 'react'
import classNameCheck from '../../../scrtipts/classNameCheck'
import BaseProps from '../../../types/BaseProps'
import IPlaylist from '../../../types/IPlaylist'
import cl from './searchedPlaylist.module.scss'

interface Props extends BaseProps {
  playlist: IPlaylist
}

const SearchedPlaylist = memo(({ className, playlist }: Props) => {
  return (
    <div className={`${cl.container} ${classNameCheck(className)}`}>
      
    </div>
  )
})

export default SearchedPlaylist
