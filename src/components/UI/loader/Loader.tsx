import React, { memo } from 'react'
import cl from './loader.module.css'

const Loader = memo(() => {
  
  return (
    <div className={cl.wrapper}>
      <div className={cl.loader}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
})
export default Loader