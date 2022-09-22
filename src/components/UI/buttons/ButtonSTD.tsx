import React, { memo } from 'react';
import BaseProps from '../../../types/BaseProps';
import classNameCheck from './../../../scrtipts/classNameCheck';
import cl from './buttonSTD.module.css'

interface Props extends BaseProps {
  children?: React.ReactNode;
  style: 'base' | 'whiteTransparent' | 'white';
}

const ButtonSTD = memo( ({onClick, className, children, style}: Props) => {

  function Click(e: React.MouseEvent) {
    e.preventDefault();
    onClick && onClick();
  }

  return (
    <button 
      onClick={Click} 
      className={`${classNameCheck(className)} ${cl.btn} ${cl[style]}`} 
    >
      {children}
    </button>
  )
})

export default ButtonSTD;