import React, { memo } from 'react';
import BaseProps from '../../../types/BaseProps';
import cl from './linkPage.module.css';
import classNameCheck from './../../../scrtipts/classNameCheck';
import { Link } from 'react-router-dom';
import { useSyncLinkToArrowNav } from './../../../hooks/syncLinkToArrowNav';

interface Props extends BaseProps {
  children?: React.ReactNode;
  isActive: boolean;
  to: string;
}

const LinkPage = memo(({ className, children, isActive, to }: Props) => {

  const active = isActive ? '_active' : '';
  const sync = useSyncLinkToArrowNav();
  
  return (
    <Link 
      className={`${cl.link} ${classNameCheck(cl[active])} ${classNameCheck(className)}`}
      to={to}
      onClick={sync}
    >
      {children}
    </Link>
  )
}, (prevProps, nextProps) => {
  return prevProps.isActive === nextProps.isActive;
})

export default LinkPage