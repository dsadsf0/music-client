import React, { memo } from 'react'
import { Navigate } from 'react-router-dom'
import cl from './likedPlaylists.module.scss'
import { useAppSeletor } from '../../hooks/redux';
import PlaylistBlock from './../home/playlistBlock/playlistBlock';
import mainRoutes from './../../routes/mainRoutes';

const LikedPlaylists = memo(() => {

  const { isAuth, user } = useAppSeletor(state => state.auth)  

  if (!isAuth)
    return <Navigate to={mainRoutes.login} replace={true} />
    
  return (
    <div className={cl.container}>
      <div className={cl.content}>
        {
          user.likedPlaylists.map((playlist) =>
            <PlaylistBlock
              key={playlist}
              className={cl.playlistBlock}
              playlistId={playlist}
            />
          )
        }
      </div>
    </div>
  )
})

export default LikedPlaylists