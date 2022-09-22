import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ISong from '../../types/ISong';

interface PlayerState {
  songs: ISong[];
  currentSong: ISong | null;
  playlistCover: string; 
  isPause: boolean;
  volume: number;
  duration: number;
  currentTime: number;
  loop: number;
  autoplay: boolean;
  shuffle: boolean;
}

const initState: PlayerState = {
  songs: [],
  currentSong: null,
  autoplay: false,
  isPause: true,
  volume: 0.1,
  duration: 0,
  currentTime: 0,
  playlistCover: 'nf.png',
  loop: 0,
  shuffle: false,
}

export const playerSlice = createSlice({
  name: 'player',
  initialState: initState,
  reducers: {
    setSongs(state, action: PayloadAction<ISong[]>) {
      state.songs = action.payload;
      state.currentSong = action.payload[0]
    },
    setVolume(state, action: PayloadAction<number>) {
      state.volume = action.payload
    },
    setIsPause(state, action: PayloadAction<boolean>) {
      state.isPause = action.payload
    },
    setCurrentSong(state, action: PayloadAction<ISong>) {
      state.currentSong = action.payload
    },
    setPlaylistCover(state, action: PayloadAction<string>) {
      state.playlistCover = action.payload
    },
    setCurrentTime(state, action: PayloadAction<number>) {
      state.currentTime = action.payload
    },
    setDuration(state, action: PayloadAction<number>) {
      state.duration = action.payload
    },
    changeLoop(state) {
      state.loop = state.loop === 2 ? 0 : ++state.loop
    }, 
    setAutoplay(state, action: PayloadAction<boolean>) {
      state.autoplay = action.payload
    }, 
    changeShuffle(state) {
      state.shuffle = !state.shuffle
    },
  },
})

export default playerSlice.reducer;