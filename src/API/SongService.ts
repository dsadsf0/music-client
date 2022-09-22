import axios from "axios";
import api, { API_URL } from ".";
import ISong from "../types/ISong";

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

}