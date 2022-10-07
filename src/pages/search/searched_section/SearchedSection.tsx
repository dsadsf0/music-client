import React, { memo } from 'react'
import classNameCheck from '../../../scrtipts/classNameCheck'
import BaseProps from '../../../types/BaseProps'
import cl from './searchedSection.module.scss'

interface Props extends BaseProps {
  children: React.ReactNode;
  title: string;
  isFound: boolean;
}

const SearchedSection = memo(({ className, children, title, isFound }: Props) => {
  return (
    <>
      {
        isFound 
          ?
            <section className={`${cl.section} ${classNameCheck(className)}`}>
              <h2>{title}</h2>
              <div className={cl.content}>
                {children}
              </div>
            </section >
          : null
      }
    </>
  )
})

export default SearchedSection
