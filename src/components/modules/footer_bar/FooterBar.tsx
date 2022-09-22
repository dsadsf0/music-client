import React, { memo } from 'react';
import BaseProps from '../../../types/BaseProps';
import cl from './footerBar.module.css';
import LinkButton from './../../UI/links/LinkButton';
import classNameCheck from './../../../scrtipts/classNameCheck';
import AuthLayout from './../auth_layout/AuthLayout';
import Player from './player/Player';


const FooterBar = memo(({ className }: BaseProps) => {

  return (
    <AuthLayout
      authed={
        <Player className={`${cl.footer} ${classNameCheck(className)}`} />
      }
      notAuthed={
        <footer className={`${cl.footer} ${classNameCheck(className)}`}>
          <div className={cl.container}>
            <div className={cl.content}>
              <span className={cl.upperText}>Preview of spotify</span>
              <p className={cl.mainText}>
                Sign up to get unlimited songs and podcasts with occasional ads. No credit needed.
              </p>
            </div>
            <LinkButton to='/signup' style='white' className={cl.link}>
              Sign up free
            </LinkButton>
          </div>
        </footer>
      }
    /> 
  )
})

export default FooterBar;
