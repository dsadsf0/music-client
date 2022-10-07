import React, { memo } from 'react'
import cl from './genres.module.scss'

const Genres = memo(() => {
  return (
    <div className={cl.container}>
      <h2 className={cl.title}>Genres</h2>
    </div>
  )
})

export default Genres