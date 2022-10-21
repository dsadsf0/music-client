import React, { memo } from 'react'
import cl from './intro.module.scss'

const Intro = memo(() => {
  return (
    <div className={cl.container}>
      <h2 className={cl.title}>
        Create your own Playlist or upload Song
      </h2>
      <span>all users will be able to listen to it</span>
    </div>
  )
})

export default Intro
