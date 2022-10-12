import api, { API_URL } from ".";
import IUser from "../types/IUser";
import ISong from './../types/ISong';

export default class UserService {
  
  static async likeSong(userId: string, songId: string) {
    try {
      const res = await api.put<IUser>(`${API_URL}/api/user/like/song`, { userId, songId })
      return res.data
    }
    catch (error) {
      throw error
    }
  }

  static async likePlaylist(userId: string, playlistId: string) {
    try {
      const res = await api.put<IUser>(`${API_URL}/api/user/like/playlist`, { userId, playlistId })
      return res.data
    }
    catch (error) {
      throw error
    }
  }

  static async getLikedSongs(userId: string) {
    try {
      const res = await api.get<ISong[]>(`${API_URL}/api/user/like/song/${userId}`)
      return res.data
    }
    catch (error) {
      throw error
    }
  }
  
}