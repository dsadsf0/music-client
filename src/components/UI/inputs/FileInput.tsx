import React, { memo, RefObject } from 'react'
import classNameCheck from '../../../scrtipts/classNameCheck';
import BaseProps from '../../../types/BaseProps';
import cl from './fileInput.module.scss'


interface Props extends BaseProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  accept: string;
}

const FileInput = memo(React.forwardRef<HTMLInputElement, Props>(({ className, onChange, accept }: Props, ref) => {
  return (
      <input
        className={`${classNameCheck(className)}`}
        ref={ref}
        onChange={onChange}
        type='file'
        accept={accept}
      />
  )
}))

export default FileInput