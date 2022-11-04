import api, { API_URL } from ".";
import IUser from "../types/IUser";
import ISong from './../types/ISong';
import IPlaylist from './../types/IPlaylist';

export default class UserService {
  
  static async likeSong(songId: string) {
    try {
      const res = await api.put<IUser>(`${API_URL}/api/user/like/song`, { songId })
      return res.data
    }
    catch (error) {
      throw error
    }
  }

  static async likePlaylist(playlistId: string) {
    try {
      const res = await api.put<IUser>(`${API_URL}/api/user/like/playlist`, { playlistId })
      return res.data
    }
    catch (error) {
      throw error
    }
  }

  static async getLikedSongs() {
    try {
      const res = await api.get<ISong[]>(`${API_URL}/api/user/liked/songs`)
      return res.data
    }
    catch (error) {
      throw error
    }
  }

  static async getLikedPlaylists() {
    try {
      const res = await api.get<IPlaylist[]>(`${API_URL}/api/user/liked/playlists`)
      return res.data
    }
    catch (error) {
      throw error
    }
  }

  static async getCreatedPlaylists() {
    try {
      const response = await api.get<IPlaylist[]>(`${API_URL}/api/user/uploaded/playlists`);
      return response.data;
    }
    catch (error) {
      throw error
    }
  }

  static async getUploadedSongs() {
    try {
      const res = await api.get<ISong[]>(`${API_URL}/api/user/uploaded/songs`)
      return res.data
    }
    catch (error) {
      throw error
    }
  }
  
  
}