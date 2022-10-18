import axios from "axios";
import api, { API_URL } from ".";
import ISong from "../types/ISong";
import IUser from './../types/IUser';

export default class SongService {

  static async getAllSongs() {
    try {
      const response = await api.get<ISong[]>(`${API_URL}/api/song`);
      return response.data;
    }
    catch (error) {
      throw error
    }
  }

  static async getCountSongs(count: number) {
    try {
      const response = await api.get<ISong[]>(`${API_URL}/api/song`, {
        params: {
          limit: count
        },
      });
      return response.data;
    }
    catch (error) {
      throw error
    }
  }

  static async getSongById(id: string) {
    try {
      const response = await api.get<ISong>(`${API_URL}/api/song/${id}`);
      return response.data;
    }
    catch (error) {
      throw error
    }
  }

  static async getSongsByQuery(query: string) {
    try {
      const response = await api.get<ISong[]>(`${API_URL}/api/songs/${query}`);
      return response.data;
    }
    catch (error) {
      throw error
    }
  }

  static async uploadSong(data: FormData) {
    try {
      const response = await api.post<IUser>(`${API_URL}/api/song`, data, {
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

}