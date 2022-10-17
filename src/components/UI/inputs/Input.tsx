import React, { memo } from 'react'
import classNameCheck from '../../../scrtipts/classNameCheck'
import BaseProps from '../../../types/BaseProps';
import cl from './input.module.css'

interface Props extends BaseProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: 'text' | 'email' | 'password';
}

const Input = memo(({ className, value, onChange, placeholder, type }: Props ) => {
  return (
    <div className={`${cl.wrapper} ${classNameCheck(className)}`}>
      <input
        value={value}
        onChange={e => onChange(e)}
        placeholder={placeholder}
        type={type? type : 'text'}
      />
    </div>
  )
})

export default Input