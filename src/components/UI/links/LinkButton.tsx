import React, { memo } from 'react';
import BaseProps from '../../../types/BaseProps';
import cl from './linkButton.module.css';
import classNameCheck from './../../../scrtipts/classNameCheck';
import { Link } from 'react-router-dom';
import { useSyncLinkToArrowNav } from '../../../hooks/syncLinkToArrowNav';

interface Props extends BaseProps {
  children?: React.ReactNode;
  style: 'base' | 'white' | 'transparent';
  to: string;
}

const LinkButton = memo(({ className, children, style, to, onClick}: Props) => {

  const sync = useSyncLinkToArrowNav();

  const click = (e: React.MouseEvent) => {
    onClick && onClick(e)
    sync()
  }
  
  return (
    <Link 
      className={`${cl.link} ${cl[style]} ${classNameCheck(className)}`} 
      to={to} 
      onClick={click}
    >
      {children}
    </Link>
  )
})

export default LinkButton
