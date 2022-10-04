import React, { memo } from 'react'
import cl from './genres.module.scss'

const Genres = memo(() => {
  return (
    <div className={cl.container}>
      <h1 className={cl.title}>Genres</h1>
    </div>
  )
})

export default Genres