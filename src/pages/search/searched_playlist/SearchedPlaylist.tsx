import React, { memo } from 'react'
import { API_URL } from '../../../API'
import LinkStd from '../../../components/UI/links/LinkStd'
import { useAppDispatch, useAppSeletor } from '../../../hooks/redux'
import classNameCheck from '../../../scrtipts/classNameCheck'
import { playerSlice } from '../../../store/reducers/PlayerSlice'
import BaseProps from '../../../types/BaseProps'
import IPlaylist from '../../../types/IPlaylist'
import cl from './searchedPlaylist.module.scss'

interface Props extends BaseProps {
  playlist: IPlaylist
}

const SearchedPlaylist = memo(({ className, playlist }: Props) => {
  
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSeletor(state => state.auth)
  const { currentPlaylistId, isPause } = useAppSeletor(state => state.player)

  const play = (e: React.MouseEvent) => {
    if (isAuth) {
      if (currentPlaylistId !== playlist._id)
        dispatch(playerSlice.actions.setAutoplay(true))
      else {
        e.preventDefault()
        if (isPause)
          dispatch(playerSlice.actions.setIsPause(false))
        else
          dispatch(playerSlice.actions.setIsPause(true))
      }
    }
  }

  return (
    <LinkStd
      className={`${cl.container} ${classNameCheck(className)}`}
      to={`/playlist/${playlist?._id}`}
    >
      <div className={cl.cover}
        style={{ backgroundImage: `url(${API_URL}/covers/${playlist?.cover || 'nf.png'})` }}
      >
        <button
          onClick={play}
          className={cl.btn}
        >
          {
            isPause || currentPlaylistId !== playlist._id
              ?
              <div>
                <svg
                  className={cl.play}
                  x="0px" y="0px" viewBox="0 0 494.148 494.148"
                >
                  <path d="M405.284,201.188L130.804,13.28C118.128,4.596,105.356,0,94.74,0C74.216,0,61.52,16.472,61.52,44.044v406.124c0,27.54,12.68,43.98,33.156,43.98c10.632,0,23.2-4.6,35.904-13.308l274.608-187.904c17.66-12.104,27.44-28.392,27.44-45.884C432.632,229.572,422.964,213.288,405.284,201.188z" />
                </svg>
              </div>
              :
              <div>
                <svg
                  className={cl.pause}
                  x="0px" y="0px" viewBox="0 0 47.607 47.607">
                  <path d="M17.991,40.976c0,3.662-2.969,6.631-6.631,6.631l0,0c-3.662,0-6.631-2.969-6.631-6.631V6.631C4.729,2.969,7.698,0,11.36,0l0,0c3.662,0,6.631,2.969,6.631,6.631V40.976z" fill="currentColor" />
                  <path d="M42.877,40.976c0,3.662-2.969,6.631-6.631,6.631l0,0c-3.662,0-6.631-2.969-6.631-6.631V6.631C29.616,2.969,32.585,0,36.246,0l0,0c3.662,0,6.631,2.969,6.631,6.631V40.976z" fill="currentColor" />
                </svg>
              </div>
          }
        </button>
      </div>
      <div className={cl.title}>
        {playlist?.title}
      </div>
      <div className={cl.text}>
        {playlist?.description}
      </div>
    </LinkStd>
  )
})

export default SearchedPlaylist
