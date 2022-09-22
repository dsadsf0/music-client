import React, { memo } from 'react'
import cl from './sonBlock.module.scss'
import classNameCheck from '../../../scrtipts/classNameCheck'
import BaseProps from '../../../types/BaseProps'
import ISong from './../../../types/ISong';

interface Props extends BaseProps {
  song: ISong,
  index?: number,
}

const SongBlock = memo(({className, index, song}: Props) => {
  return (
    <div className={`${cl.container} ${classNameCheck(className)}`}>
      
    </div>
  )
})

export default SongBlock