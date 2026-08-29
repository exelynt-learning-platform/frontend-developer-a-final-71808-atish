import api from "./api";
import type { Country } from "../types/country";

export const countryService = {
  async getAll(): Promise<Country[]> {
    const response = await api.get<Country[]>("/country");
    return response.data;
  },
};