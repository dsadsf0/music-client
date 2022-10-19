import React, { FC,memo,} from 'react';
import BaseProps from '../../../types/BaseProps';
import cl from './sideBar.module.css';
import logo from '../../../img/spotify-logo-white.png';
import classNameCheck from './../../../scrtipts/classNameCheck';
import LinkPage from './../../UI/links/LinkPage';
import SideBarNav from './side_bar_Nav/SideBarNav';
import SideBarUserMusicNav from './side_bar_UserMusicNav/SideBarUserMusicNav';
import mainRoutes from './../../../routes/mainRoutes';


const SideBar: FC<BaseProps> = memo(({ className }) => {

  return (
    <aside className={`${cl.aside} ${classNameCheck(className)}`}>
      <div className={cl.header}>
        <LinkPage to={mainRoutes.home} className={cl.link} href="" isActive={false}>
          <img className={cl.logo} src={logo} />
        </LinkPage>
      </div>
      <SideBarNav className={cl.nav}/>
      <SideBarUserMusicNav/>
    </aside>
  )
})

export default SideBar;