import React, { createRef, memo, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import PlaylistService from '../../API/PlaylistService';
import { useFetching } from '../../hooks/fetching';
import IPlaylist from '../../types/IPlaylist';
import cl from './playlist.module.scss'
import Loader from './../../components/UI/loader/Loader';
import ISong from './../../types/ISong';
import SongService from './../../API/SongService';
import { useAppDispatch, useAppSeletor } from './../../hooks/redux';
import { playerSlice } from './../../store/reducers/PlayerSlice';
import { API_URL } from '../../API';
import getAverageRGB from './../../scrtipts/averageColor';

const Playlist = memo(() => {
  const playlisId = useParams().id || ''
  const imgRef = createRef<HTMLImageElement>()
  const [avgColor, setAvgColor] = useState('rgb(31, 31, 31)')
  const dispatch = useAppDispatch()
  const { isAuth } = useAppSeletor(state => state.auth)
  const playerSongs = useAppSeletor(state => state.player.songs)
  const { autoplay, isPause } = useAppSeletor(state => state.player)
  const [playlist, setPlaylist] = useState<IPlaylist>({} as IPlaylist)
  const [songs, setSongs] = useState<ISong[]>([])
  const [fetchPlaylist, isPlaylistLoading, fetchPlaylistError] = useFetching(async () => {
    const fetchedPlaylist = await PlaylistService.getPlaylistById(playlisId);
    setPlaylist(fetchedPlaylist)
  })
  const [fetchSongs, isSongsLoading, fetchSongsError] = useFetching(async () => {
    setSongs([])
    for (const songId of playlist.songs) {
      const fetchedSong = await SongService.getSongById(songId)
      setSongs(prev => [...prev, fetchedSong])
    }
  })
  
  const setPlayer = () => {
    if (playerSongs[0]?._id !== songs[0]?._id) {
      dispatch(playerSlice.actions.setSongs(songs))
      dispatch(playerSlice.actions.setCurrentSong(songs[0]))
      dispatch(playerSlice.actions.setPlaylistCover(playlist.cover))
      dispatch(playerSlice.actions.setAutoplay(false))
      dispatch(playerSlice.actions.setIsPause(false))
    } else {
      if (isPause)  
        dispatch(playerSlice.actions.setIsPause(false))
      else  
        dispatch(playerSlice.actions.setIsPause(true))
    }
  }  

  useEffect(() => {
    fetchPlaylist()
    fetchSongs()
  }, []);

  useEffect(() => {
    if (!isPlaylistLoading)
      fetchSongs()
  }, [isPlaylistLoading]);

  useEffect(() => {
    if (isAuth && !isSongsLoading && !playerSongs.length) dispatch(playerSlice.actions.setSongs(songs))
    if (autoplay && isAuth && !isPlaylistLoading) 
      setPlayer()
  }, [songs]);
  useEffect(() => {
    if (isAuth && !playerSongs.length) dispatch(playerSlice.actions.setPlaylistCover(playlist.cover))
  }, [playlist.cover]);

  if (isPlaylistLoading) {
    return(
      <Loader />
    )
  }

  if (fetchPlaylistError) {
    return (
      <h1>Loading Error</h1>
    )
  }

  return (
    <div 
      className={cl.playlist}
      style={{ backgroundImage: `linear-gradient(${avgColor} 0px, rgb(14, 14, 14) 600px)` }}
    >
      <div className={cl.playlist__header}>
        <div className={cl.cover}>
          <img 
            src={`${API_URL}/covers/${playlist?.cover || 'nf.png'}`} 
            alt={`playlist cover: ${playlist.title}`}
            ref={imgRef}
            onLoad={() => {
              if (imgRef?.current) {
                const color = getAverageRGB(imgRef?.current)
                setAvgColor(`rgb(${color.r},${color.g},${color.b})`)
              }
            }}
          />
        </div>
        <div className={cl.info}>
          <span className={cl.upperTitle}>playlist</span>
          <h1 className={cl.title}>{playlist.title}</h1>
          <p className={cl.description}>{playlist.description}</p>
        </div>
      </div>
      <button
        className={cl.btn}
        onClick={setPlayer}
      >
        {
          isPause || playerSongs[0]?._id !== songs[0]?._id
          ?
            <svg 
            className={cl.play}
              x="0px" y="0px" viewBox="0 0 494.148 494.148"
            >
              <path d="M405.284,201.188L130.804,13.28C118.128,4.596,105.356,0,94.74,0C74.216,0,61.52,16.472,61.52,44.044v406.124c0,27.54,12.68,43.98,33.156,43.98c10.632,0,23.2-4.6,35.904-13.308l274.608-187.904c17.66-12.104,27.44-28.392,27.44-45.884C432.632,229.572,422.964,213.288,405.284,201.188z" />
            </svg>
          : 
            <svg 
              className={cl.pause} 
              x="0px" y="0px" viewBox="0 0 47.607 47.607">
              <path d="M17.991,40.976c0,3.662-2.969,6.631-6.631,6.631l0,0c-3.662,0-6.631-2.969-6.631-6.631V6.631C4.729,2.969,7.698,0,11.36,0l0,0c3.662,0,6.631,2.969,6.631,6.631V40.976z" fill="currentColor" />
              <path d="M42.877,40.976c0,3.662-2.969,6.631-6.631,6.631l0,0c-3.662,0-6.631-2.969-6.631-6.631V6.631C29.616,2.969,32.585,0,36.246,0l0,0c3.662,0,6.631,2.969,6.631,6.631V40.976z" fill="currentColor" />
            </svg>
        }
      </button>
      <div className={cl.songList}>
        <div className={`${cl.songList__songBlock} ${cl.songList__block_intro}`}>

        </div>
        {
          songs.map((song) =>
            <div
              className={cl.songList__songBlock}
              key={song._id}
            >
              {song.name}
            </div>
          )
        }
        {
          isSongsLoading ? <Loader /> : null
        }
      </div>
      
      <div className={cl.test}></div>
    </div>
  )
})

export default Playlist
