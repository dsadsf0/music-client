import React, { memo, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PlaylistService from '../../API/PlaylistService'
import { useFetching } from '../../hooks/fetching'
import cl from './search.module.scss'
import IPlaylist from './../../types/IPlaylist';
import ISong from './../../types/ISong';
import SongService from '../../API/SongService'

const Search = memo(() => {
  const query = useParams().query || ''
  const [playlists, setPlaylists] = useState<IPlaylist[]>([])
  const [songs, setSongs] = useState<ISong[]>([])

  const [fetchPlaylists, isPlaylistsLoading, fetchPlaylistsError] = useFetching(async () => {
    setPlaylists([])
    const fetchedPlaylist = await PlaylistService.getPlaylistsByQuery(query);
    setPlaylists(fetchedPlaylist)
  })
  const [fetchSongs, isSongsLoading, fetchSongsError] = useFetching(async () => {
    setSongs([])
    const fetchedSongs = await SongService.getSongsByQuery(query);
    setSongs(fetchedSongs)
  })

  useEffect(() => {
    fetchPlaylists()
    fetchSongs()
  }, [query])
  return (
    <div className={cl.container}>
      <div>
        PLAYLISTS
      </div>
      {
        playlists.map(item =>
          <div key={item._id}>
            {item.title}
          </div>
        )
      }
      <div>
        SONGS
      </div>
      {
        songs.map(item =>
          <div key={item._id}>
            {item.name}
          </div>
        )
      }
    </div>
  )
})

export default Search