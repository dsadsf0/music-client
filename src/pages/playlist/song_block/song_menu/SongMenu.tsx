import React, { createRef, memo, useEffect, useState } from 'react'
import MeatBallsButton from '../../../../components/UI/buttons/MeatBallsButton'
import LinkStd from '../../../../components/UI/links/LinkStd'
import { useAppDispatch, useAppSeletor } from '../../../../hooks/redux'
import classNameCheck from '../../../../scrtipts/classNameCheck'
import BaseProps from '../../../../types/BaseProps'
import cl from './songMenu.module.scss'
import mainRoutes from './../../../../routes/mainRoutes';
import uploadRoutes from '../../../../routes/uploadRoutes'
import PlaylistService from '../../../../API/PlaylistService'
import ISong from './../../../../types/ISong';
import IPlaylist from './../../../../types/IPlaylist';

interface Props extends BaseProps {
  song: ISong;
  playlist?: IPlaylist
}


const SongMenu = memo(({ className, song, playlist }: Props) => {

  const [isActive, setIsActive] = useState(false)
  const { user } = useAppSeletor(state => state.auth)
  const wrapperRef = createRef<HTMLDivElement>();

  // вынести эти функции в playlist.tsx оттуда сюда передовать и изменять текущий плейлист принудительно вместе со списком песен

  const addToPlaylist = async (playlistId: string) => {
    const res = await PlaylistService.addSongToPlaylist(playlistId, song._id)
    setIsActive(false)
  }

  const removeFromPlaylist = async (playlistId: string) => {
    const res = await PlaylistService.removeSongFromPlaylist(playlistId, song._id)
    setIsActive(false)

  }

  useEffect(() => {
    function listener(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const ref = wrapperRef.current as HTMLElement;
      
      if (!(ref.compareDocumentPosition(target) & 16)) setIsActive(false);
    };
    
    document.body.addEventListener('click', listener);
    return function cleanup() { 
      document.body.removeEventListener('click', listener)

    };
  }, [wrapperRef]);

  return (
    <div
      className={`${cl.wrapper} ${classNameCheck(className)}`}
      ref={wrapperRef}
    >
      <MeatBallsButton
        className={cl.MeatBallbtn}
        onClick={(e: React.MouseEvent) => {
          setIsActive(prev => !prev)
        }}
      />
      <div className={`${cl.menu} ${isActive ? cl._active : ''}`} onClick={e => e.stopPropagation()}>
        <div
          className={`${cl.btn} ${cl.popupBtn}`}
        >
          {
            !playlist || !user.createdPlaylists.some(item => item._id === playlist._id)
            ?
              <>
                <span>Add to playlist</span>
                <div className={cl.listWrapper}>
                  <ul className={cl.playlistsList}>
                    {
                      !user.createdPlaylists.length
                        ?
                        <LinkStd
                          className={cl.link}
                          to={`${mainRoutes.upload}/${uploadRoutes.playlist}`}
                        >
                          Create playlist
                        </LinkStd>
                        :
                        <>
                          {user.createdPlaylists.map(item =>
                            <li
                              key={item._id}
                              onClick={() => addToPlaylist(item._id)}
                            >{item.title}</li>
                          )}
                        </>
                    }
                  </ul>
                </div>
                </>
            : <span
                onClick={() => removeFromPlaylist(playlist._id)}
              >
                Delete from playlist
              </span>
          }
        </div>
      </div>
    </div>
  )
})

export default SongMenu