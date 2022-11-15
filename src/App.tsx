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

function App() {

  const { isLoading } = useAppSeletor(state => state.auth)
  const dispatch = useAppDispatch()
  const checkAuth = AuthCreators.checkAuth;
  

  useEffect( () => {
    dispatch(checkAuth());
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
    </BrowserRouter>
  );
}

export default App;
