import React, { memo, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PlaylistService from '../../API/PlaylistService'
import { useFetching } from '../../hooks/fetching'
import cl from './search.module.scss'
import IPlaylist from './../../types/IPlaylist';
import ISong from './../../types/ISong';
import SongService from '../../API/SongService'
import SearchedSection from './searched_section/SearchedSection';
import Loader from '../../components/UI/loader/Loader'

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
    <>
      {
        (isPlaylistsLoading || isSongsLoading) ? <Loader/> 
        : 
          <>
            {
              (!isPlaylistsLoading && !isSongsLoading && !playlists.length && !songs.length)
                ? <h2 className={cl.nothing}>nothig was found</h2>
                :
                  <div className={cl.container}>
                    <SearchedSection
                      title='Playlists'
                      isFound={playlists.length !== 0}
                    >
                      {
                        playlists.map(item =>
                          <div key={item._id}>
                            {item.title}
                          </div>
                        )
                      }
                    </SearchedSection>
                    <SearchedSection
                      title='songs'
                      isFound={songs.length !== 0}
                    >
                      {
                        songs.map(item =>
                          <div key={item._id}>
                            {item.name}
                          </div>
                        )
                      }
                    </SearchedSection>
                  </div>
            }
          </>
      }
    </>
  )
})

export default Search