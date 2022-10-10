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
import SearchedPlaylist from './searched_playlist/SearchedPlaylist';
import SearchedSong from './searched_song/SearchedSong'
import { useAppDispatch, useAppSeletor } from '../../hooks/redux'
import { playerSlice } from '../../store/reducers/PlayerSlice'

const Search = memo(() => {
  const query = useParams().query || ''
  const [playlists, setPlaylists] = useState<IPlaylist[]>([])
  const [songs, setSongs] = useState<ISong[]>([])
  const dispatch = useAppDispatch();
  const { currentSong, isPause, currentPlaylistId } = useAppSeletor(state => state.player)
  const [currentSongsPlaylist, setCurrentSongsPlaylist] = useState('')

  const [fetchPlaylists, isPlaylistsLoading, fetchPlaylistsError] = useFetching(async () => {
    setPlaylists([])
    const fetchedPlaylist = await PlaylistService.getPlaylistsByQuery(query);
    setPlaylists(fetchedPlaylist)
  })
  const [fetchSongs, isSongsLoading, fetchSongsError] = useFetching(async () => {
    setSongs([])
    const fetchedSongs = await SongService.getSongsByQuery(query);
    setSongs(fetchedSongs)
    setCurrentSongsPlaylist(JSON.stringify(fetchedSongs))
  })

  const setPlayer = () => {
    if (!isSongsLoading) {
      if (currentPlaylistId !== currentSongsPlaylist) {
        dispatch(playerSlice.actions.setSongs(songs))
        dispatch(playerSlice.actions.setCurrentSong(songs[0]))
        dispatch(playerSlice.actions.setCurrentPlaylistId(JSON.stringify(songs)))
        dispatch(playerSlice.actions.setPlaylistCover(songs[0].cover))
        dispatch(playerSlice.actions.setAutoplay(false))
        dispatch(playerSlice.actions.setIsPause(false))
      } else {
        if (isPause)
          dispatch(playerSlice.actions.setIsPause(false))
        else
          dispatch(playerSlice.actions.setIsPause(true))
      }
    }
  }

  const setSong = (song: ISong) => {
    if (currentPlaylistId === currentSongsPlaylist) {
      dispatch(playerSlice.actions.setCurrentSong(song))
      dispatch(playerSlice.actions.setIsPause(false))
    } else {
      setPlayer()
      dispatch(playerSlice.actions.setCurrentSong(song))
    }
  }

  useEffect(() => {
    fetchPlaylists()
    fetchSongs()
  }, [query])

  if (isPlaylistsLoading || isSongsLoading) 
    return (<Loader />)

  if (!isPlaylistsLoading && !isSongsLoading && !playlists.length && !songs.length)
    return (<h2 className={cl.nothing}>Nothig was found</h2>)

  return (
    <div className={cl.container}>
      <SearchedSection
        title='Playlists'
        isFound={!!playlists.length}
      >
        {
          playlists.map(item =>
            <SearchedPlaylist
              key={item._id}
              playlist={item}
            />
          )
        }
      </SearchedSection>
      <SearchedSection
        title='Songs'
        isFound={!!songs.length}
      >
        {
          songs.map(item =>
            <SearchedSong 
              key={item._id}
              song={item}
              playTrack={setSong}
              isActive={currentPlaylistId === currentSongsPlaylist && currentSong?._id === item._id}
            />
          )
        }
      </SearchedSection>
    </div>
  )
})

export default Search