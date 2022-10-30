import React, { createRef, memo, useEffect, useState } from 'react'
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
  const currentPlayingSongs = useAppSeletor(state => state.player.songs)
  const [currentSongsPlaylist, setCurrentSongsPlaylist] = useState('')
  const playlistSectionRef = createRef<HTMLDivElement>()

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

  const addToPlaylist = async (plId: string, song: ISong) => {
    await PlaylistService.addSongToPlaylist(plId, song._id)
    if (currentPlaylistId === plId) {
      const newSongs = [...currentPlayingSongs, song]
      const curSong = currentSong
      dispatch(playerSlice.actions.setSongs(newSongs))
      if (curSong) {
        dispatch(playerSlice.actions.setCurrentSong(curSong))
      }
    }
  }

  useEffect(() => {
    fetchPlaylists()
    fetchSongs()
  }, [query])

  useEffect(() => {
    if (playlistSectionRef.current) {
      const sectionWidth = playlistSectionRef.current.clientWidth
      const a = playlistSectionRef.current.childNodes[0] as HTMLElement
      const count = Math.floor((sectionWidth + 30) / (a.clientWidth + 30))

      if (count < playlists.length) {
        playlistSectionRef.current.childNodes.forEach(item => {
          const link = item as HTMLElement
          const additionalWidth = Math.floor((sectionWidth - ((a.clientWidth + 30) * count) + 30) / count)
          link.style.height = Math.ceil(a.clientHeight) + additionalWidth + 'px'
          link.style.width = Math.ceil(a.clientWidth) + additionalWidth + 'px'
        })
      }
      
    }
  }, [playlistSectionRef])

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
        <div className={cl.playlistSection} ref={playlistSectionRef}>
          {
            playlists.map(item =>
              <SearchedPlaylist
                key={item._id}
                playlist={item}
              />
            )
          }
        </div>
      </SearchedSection>
      <SearchedSection
        title='Songs'
        isFound={!!songs.length}
      >
        <div className={cl.songSection}>
          {
            songs.map(item =>
              <SearchedSong
                key={item._id}
                song={item}
                playTrack={setSong}
                isActive={currentPlaylistId === currentSongsPlaylist && currentSong?._id === item._id}
                addToPlaylist={addToPlaylist}
              />
            )
          }
        </div>
      </SearchedSection>
    </div>
  )
})

export default Search