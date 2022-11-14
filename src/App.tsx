import React, { useEffect } from 'react';
import './styles/reset.css';
import './styles/iconFont.css';
import cl from './styles/app.module.css';
import { BrowserRouter } from 'react-router-dom';
import SideBar from './components/modules/side_bar/SideBar';
import HeaderBar from './components/modules/header_bar/HeaderBar';
import FooterBar from './components/modules/footer_bar/FooterBar';
import Main from './components/modules/main/Main';
import { useAppDispatch, useAppSeletor } from './hooks/redux';
import AuthCreators from './store/actionCreators/AuthCreators';
import Loader from './components/UI/loader/Loader';
import popup from './styles/addToPlaylistPopup.module.scss'

function App() {

  const { isLoading, user, isAuth } = useAppSeletor(state => state.auth)
  const dispatch = useAppDispatch()
  const checkAuth = AuthCreators.checkAuth;

  useEffect( () => {
    dispatch(checkAuth());
    const click = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const popup = target.closest('div[data-add_to_playlist_active]')
      if (popup) {
        popup.setAttribute('data-add_to_playlist_active', 'false')
      }
    }

    document.addEventListener('click', click) 

    return () => document.removeEventListener('click', click)
  }, [])

  if (isLoading) 
    return <Loader />

  return (
    <BrowserRouter>
      <div className={cl.container}>
        <SideBar className={cl.aside} />
        <HeaderBar className={cl.header} />
        <Main className={cl.main}/>
        <FooterBar className={cl.footer} />
      </div>
      <div className={cl.addToPlaylistPopUp} data-add_to_playlist_active='true'>
        <div className={popup.container} onClick={e => e.stopPropagation()}>
          <h2 className={popup.title}>Choose playlist to add song</h2>
          <div className={popup.content}>
            {
              !isAuth ? null
                : !user.createdPlaylists.length ? <div className={popup.block}>Create Playlist</div>
                  : user.createdPlaylists.map(item =>
                    <div 
                      className={popup.block}
                      key={item._id}
                    >
                      {item.title}
                    </div>
                  )
            }
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
