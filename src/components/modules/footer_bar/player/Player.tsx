import React, { memo, useEffect, useMemo, useState } from 'react'
import { API_URL } from '../../../../API';
import { useAppSeletor } from '../../../../hooks/redux';
import classNameCheck from '../../../../scrtipts/classNameCheck';
import BaseProps from './../../../../types/BaseProps';
import cl from './player.module.scss'
import { useAppDispatch } from './../../../../hooks/redux';
import { playerSlice } from './../../../../store/reducers/PlayerSlice';
import { curSongTime, durSong } from './../../../../scrtipts/songTime';
import RangeInput from '../../../UI/inputs/RangeInput';
import mobileChek from '../../../../scrtipts/mobileCheck';
import LikeButton from '../../../UI/buttons/LikeButton';
import { authSlice } from '../../../../store/reducers/AuthSlice';
import UserService from '../../../../API/UserService';

let audio: HTMLAudioElement;

const Player = memo(({ className }: BaseProps) => {

  const { songs, currentSong, isPause, volume, playlistCover, currentTime, duration, loop, shuffle} = useAppSeletor(state => state.player)
  const dispatch = useAppDispatch()
  const [volumeDisabled, setVolumeDisabled] = useState<number | null>(null) 

  const shuffledSongs = useMemo(() => {
    if (shuffle && currentSong) {
      return [currentSong, ...songs.filter(item => item._id !== currentSong?._id).sort(() => Math.random() - 0.5)]
    }
    return [...songs]
  }, [shuffle, songs])

  const { user } = useAppSeletor(state => state.auth)

  const like = async (e: React.MouseEvent) => {
    if (currentSong) {
      if (!user.likedSongs.includes(currentSong._id)) {
        dispatch(authSlice.actions.addLikedSong(currentSong._id))
      } else {
        dispatch(authSlice.actions.removeLikedSong(currentSong._id))
      }
      UserService.likeSong(currentSong._id)
    }
  }

  useEffect(() => {
    if (!audio) { 
      audio = new Audio()
    }

    if (currentSong) {
      if (audio.src !== `${API_URL}/music/${currentSong.src}`) audio.src = `${API_URL}/music/${currentSong.src}`      
      audio.volume = volume
      audio.onloadedmetadata = () => {
        dispatch(playerSlice.actions.setDuration(audio.duration))
      }
      audio.ontimeupdate = () => {
        dispatch(playerSlice.actions.setCurrentTime(audio.currentTime))
      }
      audio.onended = nextTrack

      if (!isPause) 
        audio.play()
      else 
        audio.pause()
    }  
  }, [currentSong, isPause, volume, loop])
  
  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(playerSlice.actions.setVolume(+e.target.value))
    setVolumeDisabled(null)
  }

  const offVolume = () => {
    if (!volumeDisabled) {
      setVolumeDisabled(volume)
      dispatch(playerSlice.actions.setVolume(0))
    } else {
      dispatch(playerSlice.actions.setVolume(volumeDisabled))
      setVolumeDisabled(null)
    }
  }

  const changeCurentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.currentTime = +e.target.value
    dispatch(playerSlice.actions.setCurrentTime(+e.target.value))
  }

  const changeLoop = () => {
    dispatch(playerSlice.actions.changeLoop())
  }

  const changeShuffle = () => {
    dispatch(playerSlice.actions.changeShuffle())
  }
  
  const playTrack = () => {
    if (currentSong) {
      if (isPause) {
        dispatch(playerSlice.actions.setIsPause(false))
      } else {
        dispatch(playerSlice.actions.setIsPause(true))
      }
    }
  }

  const nextTrack = () => {
    const currentIndex = shuffledSongs.findIndex(item => item._id === currentSong?._id)
    switch (loop) {
      case 0:
        if (currentIndex !== -1) {
          if (currentIndex === shuffledSongs.length - 1) {
            dispatch(playerSlice.actions.setIsPause(true))
            audio.pause()
            dispatch(playerSlice.actions.setCurrentSong(shuffledSongs[0]))
          }
          else {
            
            dispatch(playerSlice.actions.setCurrentSong(shuffledSongs[currentIndex + 1]))
          }
          audio.currentTime = 0.0;
        }        
        break;
      case 1:
        if (currentIndex !== -1) {
          if (currentIndex === shuffledSongs.length - 1) {
            dispatch(playerSlice.actions.setCurrentSong(shuffledSongs[0]))
          }
          else {
            dispatch(playerSlice.actions.setCurrentSong(shuffledSongs[currentIndex + 1]))
          }
          audio.currentTime = 0.0;
          audio.play()
        }  
        break;
      case 2:
        audio.currentTime = 0.0;
        audio.play()
        break;
      default:
        break;
    }
  }

  const prevTrack = () => {
    const currentIndex = shuffledSongs.findIndex(item => item._id === currentSong?._id)
    switch (loop) {
      case 0:
        if (currentIndex !== -1) {
          if (currentIndex === 0) {
            dispatch(playerSlice.actions.setIsPause(true))
            audio.pause()          
          } else {
            dispatch(playerSlice.actions.setCurrentSong(shuffledSongs[currentIndex - 1]))
          }
          audio.currentTime = 0.0;
        }
        break;
      case 1:
        if (currentIndex !== -1) {
          if (currentIndex === 0) {
            dispatch(playerSlice.actions.setCurrentSong(shuffledSongs[shuffledSongs.length - 1]))

          } else {
            dispatch(playerSlice.actions.setCurrentSong(shuffledSongs[currentIndex - 1]))
          }
          audio.currentTime = 0.0;
        }
        break;
      case 2:
        audio.currentTime = 0.0;
        audio.play()
        break;
      default:
        break;
    }
  }

  return (
    <footer className={`${cl.footer} ${classNameCheck(className)}`}>
      <div className={cl.container}>
        <div className={cl.side}>
          <div
            className={cl.side__cover}
            style={{ 
              backgroundImage: (currentSong && playlistCover) ? `url(${API_URL}/covers/${currentSong?.cover ? currentSong?.cover : playlistCover})` : 'none'
            }}
          >
          </div>
          <div className={cl.songInfo}>
            <div className={cl.songInfo__name}>{currentSong?.name}</div>
            <div className={cl.songInfo__artist}>{currentSong?.author}</div>
          </div>
        </div>
        <div className={cl.middle}>
          <div className={cl.controls}>
            <button
              className={`icon-shuffle ${cl.controls__btn} ${cl.icon} ${shuffle ? cl._active : ''}`}
              onClick={changeShuffle}
            >
            </button>
            <button 
              className={`icon-to-start ${cl.controls__btn} ${cl.icon}`}
              onClick={prevTrack}
            >
            </button>
            <button
              className={cl.controls__btn}
              onClick={playTrack}
            >
              {
                isPause ?
                  <svg 
                    className={cl.play}
                    x="0px" y="0px" viewBox="0 0 494.148 494.148">
                    <path d="M405.284,201.188L130.804,13.28C118.128,4.596,105.356,0,94.74,0C74.216,0,61.52,16.472,61.52,44.044v406.124c0,27.54,12.68,43.98,33.156,43.98c10.632,0,23.2-4.6,35.904-13.308l274.608-187.904c17.66-12.104,27.44-28.392,27.44-45.884C432.632,229.572,422.964,213.288,405.284,201.188z" fill="currentColor" />
                  </svg>
                :
                  <svg x="0px" y="0px"
                    className={cl.play}
                    viewBox="0 0 47.607 47.607">
                    <path d="M17.991,40.976c0,3.662-2.969,6.631-6.631,6.631l0,0c-3.662,0-6.631-2.969-6.631-6.631V6.631C4.729,2.969,7.698,0,11.36,0l0,0c3.662,0,6.631,2.969,6.631,6.631V40.976z" fill="currentColor"/>
                    <path d="M42.877,40.976c0,3.662-2.969,6.631-6.631,6.631l0,0c-3.662,0-6.631-2.969-6.631-6.631V6.631C29.616,2.969,32.585,0,36.246,0l0,0c3.662,0,6.631,2.969,6.631,6.631V40.976z" fill="currentColor"/>
                  </svg>
              }
            </button>
            <button 
              className={`icon-to-end ${cl.controls__btn} ${cl.icon}`}
              onClick={nextTrack}
            >
            </button>
            <button 
              className={`${cl.controls__btn}`}
              onClick={changeLoop}
            >
              {
                loop === 2 
                  ? <svg className={`${cl.loop} ${cl._active}`} fill="currentColor" viewBox="0 0 1024 1024"><path d="M928 476.8c-19.2 0-32 12.8-32 32v86.4c0 108.8-86.4 198.4-198.4 198.4H201.6l41.6-38.4c6.4-6.4 12.8-16 12.8-25.6 0-19.2-16-35.2-35.2-35.2-9.6 0-22.4 3.2-28.8 9.6l-108.8 99.2c-16 12.8-12.8 35.2 0 48l108.8 96c6.4 6.4 19.2 12.8 28.8 12.8 19.2 0 35.2-12.8 38.4-32 0-12.8-6.4-22.4-16-28.8l-48-44.8h499.2c147.2 0 265.6-118.4 265.6-259.2v-86.4c0-19.2-12.8-32-32-32zM96 556.8c19.2 0 32-12.8 32-32v-89.6c0-112 89.6-201.6 198.4-204.8h496l-41.6 38.4c-6.4 6.4-12.8 16-12.8 25.6 0 19.2 16 35.2 35.2 35.2 9.6 0 22.4-3.2 28.8-9.6l105.6-99.2c16-12.8 12.8-35.2 0-48l-108.8-96c-6.4-6.4-19.2-12.8-28.8-12.8-19.2 0-35.2 12.8-38.4 32 0 12.8 6.4 22.4 16 28.8l48 44.8H329.6C182.4 169.6 64 288 64 438.4v86.4c0 19.2 12.8 32 32 32z" fill="currentColor" /><path d="M544 672V352h-48L416 409.6l16 41.6 60.8-41.6V672z" /></svg>
                  : <svg className={`${cl.loop} ${loop === 1 ? cl._active: ''}`} fill="currentColor" viewBox="0 0 1024 1024" ><path d="M694.4 854.4H195.2l48 44.8c9.6 6.4 16 16 16 28.8-3.2 19.2-19.2 32-38.4 32-9.6 0-22.4-6.4-28.8-12.8l-108.8-96c-12.8-12.8-16-35.2 0-48L192 704c6.4-6.4 19.2-9.6 28.8-9.6 19.2 0 35.2 16 35.2 35.2 0 9.6-6.4 19.2-12.8 25.6l-41.6 38.4h496c112 0 198.4-89.6 198.4-198.4v-86.4c0-19.2 12.8-32 32-32s32 12.8 32 32v86.4c0 140.8-118.4 259.2-265.6 259.2zM329.6 169.6h496l-48-44.8c-9.6-6.4-16-16-16-28.8 3.2-19.2 19.2-32 38.4-32 9.6 0 22.4 6.4 28.8 12.8l108.8 96c12.8 12.8 16 35.2 0 48L832 320c-6.4 6.4-19.2 9.6-28.8 9.6-19.2 0-35.2-16-35.2-35.2 0-9.6 6.4-19.2 12.8-25.6l41.6-38.4H326.4C217.6 233.6 128 323.2 128 435.2v89.6c0 19.2-12.8 32-32 32s-32-12.8-32-32v-86.4C64 288 182.4 169.6 329.6 169.6z" /></svg>
              }
            </button>
          </div>
          <div className={cl.songTime}>
            <span className={cl.songTime__count}>{curSongTime(currentTime)}</span>
            <RangeInput
              className={cl.songTime__change}
              value={Math.floor(currentTime)}
              onChange={changeCurentTime}
              min={0}
              max={Math.floor(duration)}
              step={1}
            />
            <span className={cl.songTime__count}>{durSong(duration)}</span>
          </div>
        </div>
        <div className={cl.side}>
          <LikeButton
            className={cl.likeBtn}
            isActive={currentSong ? user.likedSongs.includes(currentSong._id) : false}
            like={like}
          />
          <div className={cl.volume} style={{ display: mobileChek(navigator,window) ? 'none' : 'flex' }}>
            <span 
              className={`icon-volume-up ${cl.volume__icon} ${volumeDisabled ? cl._disabled : ''}`}
              onClick={offVolume}
            ></span>
            <RangeInput
              className={cl.progress}
              value={volume}
              onChange={changeVolume}
              min={0}
              max={1}
              step={0.02}
            />
          </div>
        </div>

      </div>
    </footer>
  )
})
export default Player