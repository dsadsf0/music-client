import React, { memo } from 'react'
import cl from './rangeInput.module.scss'
import BaseProps from './../../../types/BaseProps';
import classNameCheck from '../../../scrtipts/classNameCheck';

interface Props extends BaseProps {
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RangeInput = memo(({value, onChange, min, max, step, className}: Props) => {
  return (
    <div className={`${cl.progress} ${classNameCheck(className)}`}>
      <div className={cl.progress__bar} style={{ width: `${(value - min) * 100 / (max - min)}%`}}></div>
      <input
        className={cl.progress__input}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
      />
    </div>
  )
})
export default RangeInput

