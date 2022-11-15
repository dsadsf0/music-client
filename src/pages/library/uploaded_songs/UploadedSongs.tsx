import React, { memo, useEffect, useState } from 'react'
import PlaylistService from '../../../API/PlaylistService'
import UserService from '../../../API/UserService'
import Loader from '../../../components/UI/loader/Loader'
import AddToPlaylistModal from '../../../components/UI/modals/AddToPlaylistModal'
import { useFetching } from '../../../hooks/fetching'
import { useAppDispatch, useAppSeletor } from '../../../hooks/redux'
import { playerSlice } from '../../../store/reducers/PlayerSlice'
import ISong from '../../../types/ISong'
import SongBlock from '../../playlist/song_block/SongBlock'
import cl from './uploadedSongs.module.scss'

const UploadedSongs = memo(() => {

  const dispatch = useAppDispatch()
  const { currentPlaylistId, playlistCover, isPause, currentSong } = useAppSeletor(state => state.player)
  const currentPlayingSongs = useAppSeletor(state => state.player.songs)

  const [songs, setSongs] = useState<ISong[]>([])
  const [playlistId, setPlaylistId] = useState('')

  const [fetchSongs, isSongsLoading, fetchSongsError] = useFetching(async () => {
    const fetchedSongs = await UserService.getUploadedSongs()
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

  const [songIdToAdd, setSongIdToAdd] = useState<ISong>({} as ISong)
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

  const openAddToPlaylistModal = (song: ISong) => {
    setSongIdToAdd(song)
    const modal = document.body.querySelector(`div[data-type="add_to_playlist_modal"]`)
    if (modal) {
      modal.setAttribute('data-is_active', 'true')
    }
  }

  const closeAddToPlaylistModal = () => {
    const modal = document.body.querySelector(`div[data-type="add_to_playlist_modal"]`)
    if (modal) {
      modal.setAttribute('data-is_active', 'false')
      setSongIdToAdd({} as ISong)
    }
  }

  useEffect(() => {
    fetchSongs()
  }, [])

  useEffect(() => {
    setPlaylistId(JSON.stringify(songs))
  }, [isSongsLoading])

  if (isSongsLoading)
    return <Loader />

  if (fetchSongsError) return (
    <h2 className={cl.notFound}>Loading error</h2>
  )

  if (!songs.length) return (
    <h2 className={cl.notFound}>You haven't uploaded any song yet</h2>
  )
  
  return (
    <section className={cl.container}>
      {
        songs.map((song, i) =>
          <SongBlock
            className={cl.songBlock}
            key={song._id}
            song={song}
            isActive={currentPlaylistId === playlistId && currentSong?._id === song._id}
            playTrack={setSong}
            index={i + 1}
            addToPlaylist={openAddToPlaylistModal}
          />
        )
      }
      <AddToPlaylistModal
        closeModal={closeAddToPlaylistModal}
        dataType={'add_to_playlist_modal'}
        addToPlaylist={addToPlaylist}
        song={songIdToAdd}
      />
    </section>
  )
})

export default UploadedSongs