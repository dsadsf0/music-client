import React, { memo } from 'react'
import { useParams } from 'react-router-dom'
import cl from './search.module.scss'

const Search = memo(() => {
  const query = useParams().query || ''

  return (
    <div className={cl.container}>{query}</div>
  )
})

export default Search