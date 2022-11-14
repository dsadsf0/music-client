import React, { memo } from 'react'
import classNameCheck from '../../../scrtipts/classNameCheck';
import BaseProps from './../../../types/BaseProps';
import cl from './minusButton.module.scss'

interface Props extends BaseProps {}

const MinusButton = memo(({ className, onClick }: Props) => {

  function click(e: React.MouseEvent) {
    e.preventDefault();
    onClick && onClick(e);
  }

  return (
    <button 
      className={`${classNameCheck(className)} ${cl.btn}`}
      onClick={click}
    >
      <svg x="0px" y="0px" viewBox="0 0 210.414 210.414">
        <path d="M105.207,0C47.196,0,0,47.196,0,105.207c0,58.011,47.196,105.207,105.207,105.207
          c58.011,0,105.207-47.196,105.207-105.207C210.414,47.196,163.218,0,105.207,0z M105.207,202.621
          c-53.715,0-97.414-43.699-97.414-97.414c0-53.715,43.699-97.414,97.414-97.414c53.715,0,97.414,43.699,97.414,97.414
          C202.621,158.922,158.922,202.621,105.207,202.621z" fill="currentColor"/>
        <path d="M155.862,101.31H54.552c-2.152,0-3.897,1.745-3.897,3.897c0,2.152,1.745,3.897,3.897,3.897h101.31
          c2.152,0,3.897-1.745,3.897-3.897C159.759,103.055,158.014,101.31,155.862,101.31z" fill="currentColor"/>
      </svg>
    </button>
  )
})

export default MinusButton