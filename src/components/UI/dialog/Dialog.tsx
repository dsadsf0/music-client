import React, { memo } from 'react'
import classNameCheck from '../../../scrtipts/classNameCheck'
import BaseProps from '../../../types/BaseProps'
import cl from './dialog.module.css'

interface Props extends BaseProps {
  isActive: boolean;
  children?: React.ReactNode;
}

const Dialog = memo(({ className, isActive, children, }: Props) => {

  const active = isActive ? '_active' : '';

  return (
    <div className={`${classNameCheck(className)} ${cl.dialog} ${classNameCheck(cl[active])}`} onClick={(e) => e.stopPropagation()}>
      <div className={cl.container}>
        {children}
      </div>
    </div>
  )
})

export default Dialog
