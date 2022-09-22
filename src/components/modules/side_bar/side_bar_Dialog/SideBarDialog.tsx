import React, { Dispatch, memo, RefObject, SetStateAction, useEffect } from 'react'
import classNameCheck from '../../../../scrtipts/classNameCheck';
import BaseProps from '../../../../types/BaseProps';
import Dialog from '../../../UI/dialog/Dialog';
import LinkButton from '../../../UI/links/LinkButton';
import cl from './sideBarDialog.module.css'
import ButtonSTD from './../../../UI/buttons/ButtonSTD';


interface Props extends BaseProps {
  isActive: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;  
  rootRef: RefObject<HTMLElement>;
  title: string;
  text: string;
}

const SideBarDialog = memo(({ className, isActive, setActive, rootRef, title, text, }: Props) => {

  const active = isActive ? '_active' : '';

  useEffect(() => {
    function listener(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const ref = rootRef.current as HTMLElement;
      
      if (!(ref.compareDocumentPosition(target) & 16)) setActive(false);
    };
    
    document.body.addEventListener('click', listener);
    return function cleanup() { document.body.removeEventListener('click', listener) };
  }, [rootRef]);

  return (
    <Dialog className={`${cl.dialog} ${classNameCheck(cl[active])} ${classNameCheck(className)}`} isActive={isActive}>
      <div className={cl.container}>
        <div className={cl.main}>
          <h3 className={cl.title}>{title}</h3>
          <p className={cl.text}>
            {text}
          </p>
        </div>
        <div className={cl.footer}>
          <ButtonSTD
            style='whiteTransparent'
            className={`${cl.link} ${cl.btn}`}
            onClick={() => {
              setActive(false);
            }}
          >
            Not Now
          </ButtonSTD>
          <LinkButton 
            to='/login' 
            className={cl.link} 
            style='white'
            onClick={() => {
              setActive(false);
            }}
          >
            Log in
          </LinkButton>
        </div>
      </div>
    </Dialog>
  )
})

export default SideBarDialog;
