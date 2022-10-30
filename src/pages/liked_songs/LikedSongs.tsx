import React, { memo, useEffect, useState } from 'react'
import cl from './likedSongs.module.scss'
import { Navigate } from 'react-router-dom'
import { useAppSeletor } from '../../hooks/redux'
import SongBlock from './../playlist/song_block/SongBlock';
import { useFetching } from '../../hooks/fetching';
import ISong from './../../types/ISong';
import { useAppDispatch } from './../../hooks/redux';
import { playerSlice } from '../../store/reducers/PlayerSlice';
import Loader from '../../components/UI/loader/Loader';
import UserService from './../../API/UserService';
import mainRoutes from './../../routes/mainRoutes';
import PlaylistService from '../../API/PlaylistService';

const LikedSongs = memo(() => {

  const dispatch = useAppDispatch()
  const { isAuth, user} = useAppSeletor(state => state.auth)
  const { currentPlaylistId, playlistCover, isPause, currentSong } = useAppSeletor(state => state.player)
  const currentPlayingSongs = useAppSeletor(state => state.player.songs)

  const [songs, setSongs] = useState<ISong[]>([])
  const [playlistId, setPlaylistId] = useState('')

  const [fetchSongs, isSongsLoading, fetchSongsError] = useFetching(async () => {
    const fetchedSongs = await UserService.getLikedSongs()
    setSongs(fetchedSongs)
  })

  const setPlayer = () => {
    if (!isSongsLoading) {
      if (currentPlaylistId !== playlistId) {
        dispatch(playerSlice.actions.setSongs(songs))
        dispatch(playerSlice.actions.setCurrentSong(songs[0]))
        dispatch(playerSlice.actions.setCurrentPlaylistId(playlistId))
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
    if (currentPlaylistId === playlistId) {
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
    fetchSongs()
  }, [])

  useEffect(() => {
    setPlaylistId(JSON.stringify(songs))
  }, [isSongsLoading])

  if (!isAuth) 
    return <Navigate to={mainRoutes.login} replace={true} />

  if (isSongsLoading) 
    return <Loader />

  if (fetchSongsError) return (
    <h2 className={cl.notFound}>Loading error</h2>
  )

  if (!songs.length) return (
    <h2 className={cl.notFound}>You haven't uploaded any song yet</h2>
  )

  return (
    <div className={cl.container}>
      <h2 className={cl.title}>Liked Songs</h2>
      {
        songs.map( (song, i) => 
          <SongBlock
            className={cl.songBlock}
            key={song._id}
            song={song}
            isActive={currentPlaylistId === playlistId && currentSong?._id === song._id}
            playTrack={setSong}
            index={i+1}
            addToPlaylist={addToPlaylist}
          />
        )
      }
    </div>
  )
})

export default LikedSongs