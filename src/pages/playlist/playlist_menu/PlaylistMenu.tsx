import React, { createRef, memo, useEffect, useState } from 'react'
import MeatBallsButton from '../../../components/UI/buttons/MeatBallsButton'
import { useAppDispatch, useAppSeletor } from '../../../hooks/redux'
import classNameCheck from '../../../scrtipts/classNameCheck'
import BaseProps from '../../../types/BaseProps'
import cl from './playlistMenu.module.scss'
import PlaylistService from './../../../API/PlaylistService';
import { authSlice } from './../../../store/reducers/AuthSlice';
import { useNavigate } from 'react-router-dom'
import mainRoutes from '../../../routes/mainRoutes'

interface Props extends BaseProps {
  playlistId: string
}

const PlaylistMenu = memo(({ className, playlistId }: Props) => {

  const [isActive, setIsActive] = useState(false)
  const navigate = useNavigate()
  const { user } = useAppSeletor(state => state.auth)
  const dispatch = useAppDispatch()
  const wrapperRef = createRef<HTMLDivElement>();

  const deletePlaylist = async () => {
    const res = await PlaylistService.deletePlaylist(playlistId)
    dispatch(authSlice.actions.setUser(res))
    navigate(mainRoutes.home, { replace: true })
  }

  useEffect(() => {
    function listener(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const ref = wrapperRef.current as HTMLElement;

      if (!(ref.compareDocumentPosition(target) & 16)) setIsActive(false);
    };

    document.body.addEventListener('click', listener);
    return function cleanup() { document.body.removeEventListener('click', listener) };
  }, [wrapperRef]);

  return (
    <div 
      className={`${cl.wrapper} ${classNameCheck(className)}`}
      ref={wrapperRef}
    >
      <MeatBallsButton
        className={cl.MeatBallbtn}
        onClick={() => setIsActive(prev => !prev)}
      />
      <div className={`${cl.menu} ${isActive ? cl._active : ''}`}>
        {
          user.createdPlaylists.includes(playlistId) 
          ? <div 
              className={cl.btn}
              onClick={deletePlaylist}
            >
              Delete playlist
            </div>
          : null
        }
      </div>
    </div>
  )
})

export default PlaylistMenu
