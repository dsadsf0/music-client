import React, { memo } from 'react'
import classNameCheck from '../../../scrtipts/classNameCheck';
import BaseProps from '../../../types/BaseProps';
import cl from './meatBallsButton.module.scss'

interface Props extends BaseProps {
}

const MeatBallsButton = memo(({ onClick, className }: Props) => {
  function click(e: React.MouseEvent) {
    e.preventDefault();
    onClick && onClick();
  }

  return (
    <button 
      className={`${classNameCheck(className)} ${cl.btn}`} 
      onClick={click}
    >
      <div></div>
      <div></div>
      <div></div>
    </button>
  )
})

export default MeatBallsButton
