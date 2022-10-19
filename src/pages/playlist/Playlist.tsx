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
import SongBlock from './song_block/SongBlock';
import LinkStd from './../../components/UI/links/LinkStd';
import LikeButton from '../../components/UI/buttons/LikeButton';
import { authSlice } from '../../store/reducers/AuthSlice';
import UserService from '../../API/UserService';
import mainRoutes from './../../routes/mainRoutes';

const Playlist = memo(() => {
  
  const playlistId = useParams().id || ''
  const songListIntroRef = createRef<HTMLDivElement>()
  const [avgColor, setAvgColor] = useState({r: 31, g:31, b: 31})
  const dispatch = useAppDispatch()
  const { isAuth, user } = useAppSeletor(state => state.auth)
  const playerSongs = useAppSeletor(state => state.player.songs)
  const { autoplay, isPause, currentSong, currentPlaylistId } = useAppSeletor(state => state.player)
  const [playlist, setPlaylist] = useState<IPlaylist>({} as IPlaylist)
  const [songs, setSongs] = useState<ISong[]>([])
  const [fetchPlaylist, isPlaylistLoading, fetchPlaylistError] = useFetching(async () => {
    const fetchedPlaylist = await PlaylistService.getPlaylistById(playlistId);
    setPlaylist(fetchedPlaylist)    
    setSongs(fetchedPlaylist.songs)
  })
  
  const setPlayer = () => {
    if (songs.length) {
      if (currentPlaylistId !== playlistId) {    
        dispatch(playerSlice.actions.setSongs(songs))
        dispatch(playerSlice.actions.setCurrentSong(songs[0]))
        dispatch(playerSlice.actions.setCurrentPlaylistId(playlistId))
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

  const likePlaylist = async (e: React.MouseEvent) => {
    if (playlistId) {
      if (!user.likedPlaylists.includes(playlistId)) {
        dispatch(authSlice.actions.addLikedPlaylist(playlistId))
      } else {
        dispatch(authSlice.actions.removeLikedlaylist(playlistId))
      }
      UserService.likePlaylist(playlistId)
    }
  }

  useEffect(() => {
    fetchPlaylist()
  }, []);

  useEffect(() => {
    if (autoplay && isAuth && songs.length) setPlayer()
  }, [isPlaylistLoading]);

  useEffect((()=> {
    const coloring = () => {
      if (main?.scrollTop && main?.scrollTop >= 310) {
        if (header) header.style.backgroundColor = `rgb(${avgColor.r * .8},${avgColor.g * .8},${avgColor.b * .8})`
      }
      else {
        if (header) header.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
      }
    }

    if (playlist.cover) {
      const imgEl = document.createElement('img')
      imgEl.crossOrigin = 'Anonymous'
      imgEl.src = `${API_URL}/covers/${playlist?.cover}`
      imgEl.onload = () => {
        const color = getAverageRGB(imgEl)
        setAvgColor({ r: color.r, g: color.g, b: color.b })
      }
    }

    const header = document.querySelector('header')
    const main = document.querySelector('main')
    main?.addEventListener('scroll', coloring)

    return () => {
      main?.removeEventListener('scroll', coloring)
      if (header) header.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
    }
  }), [playlist.cover, avgColor.r, avgColor.g, avgColor.b])
  
  useEffect(() => {
    const coloring = () => {
      if (songListIntroRef.current?.getBoundingClientRect().top === 75) {
        songListIntroRef.current.style.backgroundColor = '#202020'
      } else if (songListIntroRef.current) 
        songListIntroRef.current.style.backgroundColor = 'transparent'
    }

    const main = document.querySelector('main')
    main?.addEventListener('scroll', coloring)

    return () => {
      main?.removeEventListener('scroll', coloring)
    }
  }, [songListIntroRef])

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
    <div className={cl.playlist}>
      <div className={cl.playlist__header}
        style={{ backgroundImage: `linear-gradient(rgb(${avgColor.r * 1.2},${avgColor.g * 1.2},${avgColor.b*1.2}) 0%, rgb(${avgColor.r * 0.65},${avgColor.g * 0.65},${avgColor.b * 0.65}) 100%)` }}
      >
        <div className={cl.playlist__intro}>
          <div className={cl.cover}>
            <img
              src={`${API_URL}/covers/${playlist?.cover || 'nf.png'}`}
              alt={`playlist cover: ${playlist.title}`}
            />
          </div>
          <div className={cl.info}>
            <span className={cl.upperTitle}>playlist</span>
            <h1 className={cl.title}>{playlist.title}</h1>
            <p className={cl.description}>{playlist.description}</p>
          </div>
        </div>
        <div className={cl.playlistBtns}>
          {
            isAuth
              ?
              <button
                className={cl.btn}
                onClick={setPlayer}
              >
                {
                  isPause || currentPlaylistId !== playlistId
                    ?
                    <svg
                      className={cl.play}
                      x="0px" y="0px" viewBox="0 0 494.148 494.148"
                    >
                      <path d="M405.284,201.188L130.804,13.28C118.128,4.596,105.356,0,94.74,0C74.216,0,61.52,16.472,61.52,44.044v406.124c0,27.54,12.68,43.98,33.156,43.98c10.632,0,23.2-4.6,35.904-13.308l274.608-187.904c17.66-12.104,27.44-28.392,27.44-45.884C432.632,229.572,422.964,213.288,405.284,201.188z" />
                    </svg>
                    :
                    <div>
                      <svg
                        className={cl.pause}
                        x="0px" y="0px" viewBox="0 0 47.607 47.607">
                        <path d="M17.991,40.976c0,3.662-2.969,6.631-6.631,6.631l0,0c-3.662,0-6.631-2.969-6.631-6.631V6.631C4.729,2.969,7.698,0,11.36,0l0,0c3.662,0,6.631,2.969,6.631,6.631V40.976z" fill="currentColor" />
                        <path d="M42.877,40.976c0,3.662-2.969,6.631-6.631,6.631l0,0c-3.662,0-6.631-2.969-6.631-6.631V6.631C29.616,2.969,32.585,0,36.246,0l0,0c3.662,0,6.631,2.969,6.631,6.631V40.976z" fill="currentColor" />
                      </svg>
                    </div>
                }
              </button>
              :
              <LinkStd
                to={mainRoutes.login}
                className={cl.btn}
              >
                <svg
                  className={cl.play}
                  x="0px" y="0px" viewBox="0 0 494.148 494.148"
                >
                  <path d="M405.284,201.188L130.804,13.28C118.128,4.596,105.356,0,94.74,0C74.216,0,61.52,16.472,61.52,44.044v406.124c0,27.54,12.68,43.98,33.156,43.98c10.632,0,23.2-4.6,35.904-13.308l274.608-187.904c17.66-12.104,27.44-28.392,27.44-45.884C432.632,229.572,422.964,213.288,405.284,201.188z" />
                </svg>
              </LinkStd>
          }
          {
            isAuth 
              ? 
                <LikeButton
                  className={cl.likeBtn}
                  isActive={user.likedPlaylists.includes(playlistId)}
                  like={likePlaylist}
                /> 
              : null
          }
        </div>
      </div>
      <div className={cl.songList}>
        <div 
          className={cl.songList__intro}
          ref={songListIntroRef}
        >
          <div className={cl.songBlock__index}>
            #
          </div>
          <div className={cl.songBlock__title}>
            title
          </div>
        </div>
        {
          songs.map((song, i) =>
            <SongBlock
              className={cl.songBlock}
              key={song._id}
              song={song}
              index={i+1}
              playlistCover={playlist.cover}
              playTrack={setSong}
              isActive={currentPlaylistId === playlistId && currentSong?._id === song._id}
            />
          )
        }
      </div>
    </div>
  )
})

export default Playlist
