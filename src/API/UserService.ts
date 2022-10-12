import api, { API_URL } from ".";
import IUser from "../types/IUser";

export default class UserService {
  static async likeSong(userId: string, songId: string) {
    return await api.put<IUser>(`${API_URL}/api/user/like/song`, { userId, songId })
  }

  static async likePlaylist(userId: string, playlistId: string) {
    return await api.put<IUser>(`${API_URL}/api/user/like/playlist`, { userId, playlistId })
  }
}