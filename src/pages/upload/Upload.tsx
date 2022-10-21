import React, { memo } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import LinkStd from '../../components/UI/links/LinkStd'
import { useAppSeletor } from '../../hooks/redux'
import mainRoutes from '../../routes/mainRoutes'
import cl from './upload.module.scss'
import uploadRoutes from './../../routes/uploadRoutes';
import UploadSong from './upload_song/UploadSong'
import Intro from './intro/Intro'
import CreatePlaylist from './create_playlist/CreatePlaylist';

const Upload = memo(() => {
  const curPath = useLocation().pathname;
  const { isAuth } = useAppSeletor(state => state.auth)

  const scrollUp = () => {
    const main = document.querySelector('main')
    if (main) main.scrollTo(0, 0)
  }

  if (!isAuth)
    return <Navigate to={mainRoutes.login} replace={true} />
    
  return (
    <div className={cl.container}>
      <nav className={cl.nav}>
        <LinkStd
          to={uploadRoutes.playlist}
          className={`${cl.link} ${curPath.split('/').pop() === uploadRoutes.playlist ? cl._active : ''}`}
          onClick={scrollUp}
        >
          Create Playlist
        </LinkStd>
        <LinkStd
          to={uploadRoutes.song}
          className={`${cl.link} ${curPath.split('/').pop() === uploadRoutes.song ? cl._active : ''}`}
          onClick={scrollUp}
        >
          Upload Song
        </LinkStd>
      </nav>

      <div className={cl.content}>
        <Routes>
          <Route path={uploadRoutes.intro} element={<Intro/>}/>
          <Route path={uploadRoutes.playlist} element={<CreatePlaylist />} />
          <Route path={uploadRoutes.song} element={<UploadSong />} />
        </Routes>
      </div>

    </div>
  )
})

export default Upload