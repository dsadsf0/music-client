import React, { memo, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { useAppSeletor } from '../../../hooks/redux'
import mainRoutes from '../../../routes/mainRoutes'
import uploadRoutes from '../../../routes/uploadRoutes'
import classNameCheck from '../../../scrtipts/classNameCheck'
import BaseProps from '../../../types/BaseProps'
import ISong from '../../../types/ISong'
import LinkStd from '../links/LinkStd'
import cl from './addToPlaylistModal.module.scss'

interface Props extends BaseProps {
  closeModal: () => void,
  dataType: string,
  song: ISong,
  addToPlaylist: (playlistId: string, song: ISong) => Promise<void>
}

const AddToPlaylistModal = memo(({className, closeModal, dataType, addToPlaylist, song}: Props) => {

  const { user, isAuth } = useAppSeletor(state => state.auth)

  const handleAddToPlaylist = async (playlistId: string) => {
    closeModal && closeModal()
    await addToPlaylist(playlistId, song)
  }

  useEffect(() => {
    const close = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const modal = target.closest(`div[data-type="add_to_playlist_modal"]`)

      if (modal) closeModal()
    }
    document.addEventListener('click', close)

    return () => document.removeEventListener('click', close)
  }, [])

  if (!isAuth) return null
  
  return ReactDOM.createPortal(
    <div className={`${cl.modal} ${classNameCheck(className)}`} data-is_active='false' data-type={dataType}>
      <div className={cl.container} onClick={e => e.stopPropagation()}>
        <h2 className={cl.title}>Choose playlist to add song</h2>
        <div className={cl.content}>
          {
            !user.createdPlaylists.length 
              ? <LinkStd 
                  to={`${mainRoutes.upload}/${uploadRoutes.playlist}`} 
                  className={cl.block}
                >
                  Create Playlist
                </LinkStd>
              : 
                user.createdPlaylists.map(item =>
                  <div
                    className={cl.block}
                    key={item._id}
                    onClick={() => handleAddToPlaylist(item._id)}
                  >
                    {item.title}
                  </div>
                )
          }
        </div>
      </div>
    </div>
  , document.body)
})

export default AddToPlaylistModal