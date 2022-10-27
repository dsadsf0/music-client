import React, { memo, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import classNameCheck from '../../../scrtipts/classNameCheck';
import BaseProps from '../../../types/BaseProps';
import cl from './searchInput.module.scss'
import mainRoutes from './../../../routes/mainRoutes';


interface Props extends BaseProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: 'text' | 'email' | 'password';
  setValue: (query: string) => void
  autoFocus?: boolean
}

const SearchInput = memo(({ className, value, onChange, placeholder, type, setValue, autoFocus }:Props) => {

  const query = useParams().query || ''
  const navigate = useNavigate()

  const clearQuery = (e:React.MouseEvent) => {
    e.preventDefault()
    setValue('')
    navigate(mainRoutes.search, { replace: true })
  }
  useEffect(() => {
    setValue(query)
  }, [query])

  return (
    <div className={`${cl.wrapper} ${classNameCheck(className)}`}>
      <svg className={cl.loupe} viewBox="0 0 512 512" width="28" height="28"><path d="M349.714 347.937l93.714 109.969-16.254 13.969-93.969-109.969q-48.508 36.825-109.207 36.825-36.826 0-70.476-14.349t-57.905-38.603-38.603-57.905-14.349-70.476 14.349-70.476 38.603-57.905 57.905-38.603 70.476-14.349 70.476 14.349 57.905 38.603 38.603 57.905 14.349 70.476q0 37.841-14.73 71.619t-40.889 58.921zM224 377.397q43.428 0 80.254-21.461t58.286-58.286 21.461-80.254-21.461-80.254-58.286-58.285-80.254-21.46-80.254 21.46-58.285 58.285-21.46 80.254 21.46 80.254 58.285 58.286 80.254 21.461z" fill="black" fillRule="evenodd"></path></svg>
      <input
        value={value}
        onChange={e => onChange(e)}
        placeholder={placeholder}
        type={type? type : 'text'}
        autoFocus={autoFocus}
      />
      <div className={cl.btn}
        onClick={e => clearQuery(e)}
      >
      {
        value === '' ? null
          : <svg x="0px" y="0px" viewBox="0 0 490 490">
            <polygon points="11.387,490 245,255.832 478.613,490 489.439,479.174 255.809,244.996 489.439,10.811 478.613,0 245,234.161 
          11.387,0 0.561,10.811 234.191,244.996 0.561,479.174 "
            />
          </svg>
      }
      </div>
    </div>
    
  )
})

export default SearchInput