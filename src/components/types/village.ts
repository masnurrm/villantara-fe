export type VillageData = {
  id: number;
  name: string;
  photoUrls: string[];
  category: {
    id: number;
    name: string;
  };
  tags: {
    id: number;
    name: string;
  }[];
  status: string; 
};

export type VillagePostPayload = {
  plant_type?: string;
  humidity?: number;
  soil_ph?: number;
  temperature?: number;
  business_unit?: string;
  location_images?: string[]; 
};
