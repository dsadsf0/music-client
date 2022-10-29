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
  song: ISong,
  playlist?: IPlaylist,
  addToPlaylist?: (plId: string, song: ISong) => Promise<void>,
  removeFromPlaylist?: (songId: string) => Promise<void>,
}


const SongMenu = memo(({ className, song, playlist, removeFromPlaylist, addToPlaylist }: Props) => {

  const [isActive, setIsActive] = useState(false)
  const { user } = useAppSeletor(state => state.auth)
  const wrapperRef = createRef<HTMLDivElement>();

  const handleAddToPlaylist = async (playlistId: string) => {
    setIsActive(false)
    addToPlaylist && await addToPlaylist(playlistId, song)
  }

  const handleRemoveFromPlaylist = async () => {
    setIsActive(false)
    removeFromPlaylist && await removeFromPlaylist(song._id)
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
                              onClick={() => handleAddToPlaylist(item._id)}
                            >{item.title}</li>
                          )}
                        </>
                    }
                  </ul>
                </div>
                </>
            : <span
                onClick={handleRemoveFromPlaylist}
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