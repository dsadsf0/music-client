import axios, { AxiosResponse } from "axios";
import api, { API_URL } from ".";
import IUser from "../types/IUser";
import IPlaylist from './../types/IPlaylist';
import Playlist from './../pages/playlist/Playlist';

export default class PlaylistService {
  
  static async getAllPlaylists() {
    try {
      const response = await api.get<IPlaylist[]>(`${API_URL}/api/playlist`);
      return response.data;
    }
    catch (error) {
      throw error
    }
  }

  static async getLikedPlaylists() {
    try {
      const response = await api.get<IPlaylist[]>(`${API_URL}/api/user/liked/playlists`);
      return response.data;
    }
    catch (error) {
      throw error
    }
  }

  static async getCountPlaylists(count: number) {
    try {
      const response = await api.get<IPlaylist[]>(`${API_URL}/api/playlist`, {
        params: {
          limit: count
        }
      });
      return response.data;
    }
    catch (error) {
      throw error
    }
  }

  static async getPlaylistById(id: string) {
    try {
      const response = await api.get<IPlaylist>(`${API_URL}/api/playlist/${id}`);
      return response.data;
    }
    catch (error) {
      throw error
    }
  }

  static async getPlaylistsByQuery(query: string) {
    try {
      const response = await api.get<IPlaylist[]>(`${API_URL}/api/playlists/${query}`);
      return response.data;
    }
    catch (error) {
      throw error
    }
  }

  static async createPlaylist(data: FormData) {
    try {
      const response = await api.post<IUser>(`${API_URL}/api/playlist`, data, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      return response.data;
    }
    catch (error) {
      throw error
    }
  }

  static async deletePlaylist(playlistId: string) {
    try {
      const response = await api.delete<IUser>(`${API_URL}/api/user/uploaded/playlists/${playlistId}`);
      return response.data;
    }
    catch (error) {
      throw error
    }
  }

  static async addSongToPlaylist(playlistId: string, songId: string) {    
    try {
      const response = await api.put<IUser>(`${API_URL}/api/playlist/addSong/${playlistId}`, {songId});
      return response.data;
    }
    catch (error) {
      throw error
    }    
  }

  static async removeSongFromPlaylist(playlistId: string, songId: string) {
    try {
      const response = await api.put<IUser>(`${API_URL}/api/playlist/removeSong/${playlistId}`, {songId});
      return response.data;
    }
    catch (error) {
      throw error
    }
  }


}