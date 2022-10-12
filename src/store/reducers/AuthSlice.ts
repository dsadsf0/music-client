import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IAuthError from "../../types/IAuthError";
import IUser from "../../types/IUser";

interface AuthState {
  isAuth: boolean;
  isLoading: boolean;
  user: IUser;
  Error: IAuthError
}

const initState: AuthState = {
  isLoading: true,
  isAuth: false,
  user: {} as IUser,
  Error: {} as IAuthError
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: initState,
  reducers: {
    setAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<IAuthError>) {
      state.Error = action.payload
    },
    setLikedSongs(state, action: PayloadAction<string[]>) {
      state.user.likedSongs = action.payload
    }, 
    addLikedSong(state, action: PayloadAction<string>) {
      state.user.likedSongs = [...state.user.likedSongs, action.payload]
    },
    removeLikedSong(state, action: PayloadAction<string>) {
      state.user.likedSongs = state.user.likedSongs.filter(song => song !== action.payload)
    },
    setLikedPlaylists(state, action: PayloadAction<string[]>) {
      state.user.likedPlaylists = action.payload
    },
    addLikedPlaylist(state, action: PayloadAction<string>) {
      state.user.likedPlaylists = [...state.user.likedSongs, action.payload]
    },
    removeLikedlaylist(state, action: PayloadAction<string>) {
      state.user.likedPlaylists = state.user.likedPlaylists.filter(playlist => playlist !== action.payload)
    },
  }
})

export default authSlice.reducer;
