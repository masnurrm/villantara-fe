import axios from "@/lib/axios";
import type { VillageData } from "@/types/village";
import type { VillagePostPayload } from "@/types/village";

export const getVillageById = async (id: number): Promise<VillageData> => {
  const response = await axios.get(`/villages/${id}`);
  return response.data;
};

export const createVillage = async (data: VillageData): Promise<VillageData> => {
  const response = await axios.post(`/villages`, data);
  return response.data;
};


export const postVillageToMarketplace = async (id: number, data: VillagePostPayload) => {
  const response = await axios.post(`/villages/${id}/marketplace`, data);
  return response.data;
};
