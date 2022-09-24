import axios from "axios";
import api, { API_URL } from ".";
import ISection from './../types/ISection';

export default class SectionService {

  static async getAllSections() {
    try {
      const response = await api.get<ISection[]>(`${API_URL}/api/section`);
      return response.data;
    }
    catch (error) {
      throw error
    }
  }

  static async getCountSections(count: number) {
    try {
      const response = await api.get<ISection[]>(`${API_URL}/api/section`, {
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

  static async getSectionById(id: string) {
    try {
      const response = await api.get<ISection>(`${API_URL}/api/section/${id}`);
      return response.data;
    }
    catch (error) {
      throw error
    }
  }

}