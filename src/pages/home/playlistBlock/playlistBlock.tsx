import React, { memo, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { API_URL } from '../../../API';
import PlaylistService from '../../../API/PlaylistService';
import { useFetching } from '../../../hooks/fetching';
import { useSyncLinkToArrowNav } from '../../../hooks/syncLinkToArrowNav';
import classNameCheck from '../../../scrtipts/classNameCheck';
import BaseProps from '../../../types/BaseProps';
import IPlaylist from '../../../types/IPlaylist';
import cl from './playlistBlock.module.css'
import { useAppDispatch } from './../../../hooks/redux';
import { playerSlice } from './../../../store/reducers/PlayerSlice';

interface Props extends BaseProps {
  playlistId: string
}

const PlaylistBlock = memo(({ className, playlistId }: Props) => {

  const sync = useSyncLinkToArrowNav();
  const dispatch = useAppDispatch();
  const [playlist, setPlaylist] = useState<IPlaylist>()
  const [fetchPlaylist, isPlaylistLoading, fetchPlaylistError] = useFetching(async () => {
    const fetchedPlaylist: IPlaylist = await PlaylistService.getPlaylistById(playlistId);
    setPlaylist(fetchedPlaylist)
  })

  useEffect(() => {
    fetchPlaylist();
  }, []);

  if (isPlaylistLoading) {
    return (
      <div className={`${cl.container} ${classNameCheck(className)}`}>
        <div className={cl.cover}>
        </div>
      </div>
    )
  }

  if (fetchPlaylistError) {
    return (
      <div className={`${cl.container} ${classNameCheck(className)}`}>
        <div className={cl.cover}
          style={{ backgroundImage: `url(${API_URL}/covers/${'nf.png'})` }}
        >
        </div>
        <div className={cl.title}>Loading Error</div>
      </div>
    )
  }

  return (
    <Link
      className={`${cl.container} ${classNameCheck(className)}`}
      to={`/playlist/${playlist?._id}`}
      onClick={sync}
    >
      <div className={cl.cover}
        style={{ backgroundImage: `url(${API_URL}/covers/${playlist?.cover || 'nf.png'})` }}
      >
        <button
          onClick={(e: React.MouseEvent) => dispatch(playerSlice.actions.setAutoplay(true))}
          className={cl.btn}
        >
          <div>
            <svg x="0px" y="0px" viewBox="0 0 494.148 494.148">
              <path d="M405.284,201.188L130.804,13.28C118.128,4.596,105.356,0,94.74,0C74.216,0,61.52,16.472,61.52,44.044v406.124c0,27.54,12.68,43.98,33.156,43.98c10.632,0,23.2-4.6,35.904-13.308l274.608-187.904c17.66-12.104,27.44-28.392,27.44-45.884C432.632,229.572,422.964,213.288,405.284,201.188z" />
            </svg>
          </div>
        </button>
      </div>
      <div className={cl.title}>
        {playlist?.title}
      </div>
      <div className={cl.text}>
        {playlist?.description}
      </div>
    </Link>
  )
})

export default PlaylistBlock