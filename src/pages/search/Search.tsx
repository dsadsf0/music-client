import React, { memo } from 'react'
import cl from './search.module.scss'

const Search = memo(() => {
  return (
    <div className={cl.container}>Search</div>
  )
})

export default Search