import React, { memo } from 'react'
import { Navigate } from 'react-router-dom'
import cl from './likedPlaylists.module.scss'
import { useAppSeletor } from '../../hooks/redux';
import PlaylistBlock from './../home/playlistBlock/playlistBlock';

const LikedPlaylists = memo(() => {

  const { isAuth, user } = useAppSeletor(state => state.auth)
  
  console.log(user.likedPlaylists);
  

  if (!isAuth)
    return <Navigate to={'/login'} replace={true} />
    
  return (
    <div className={cl.container}>
      <h2 className={cl.title}>Liked Playlists</h2>
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