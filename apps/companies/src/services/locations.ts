import apiClient from "@/lib/apiClient";

export interface CommunesResponse {
  status: string;
  message: string;
  data: Record<string, string>;
  count: number;
}

export interface ArrondissementsResponse {
  status: string;
  message: string;
  data: Record<string, string>;
  count: number;
}

export const locationsApi = {
  // Récupérer toutes les communes
  getCommunes: async (): Promise<CommunesResponse> => {
    const response = await apiClient.get("/api/communes");
    return response.data;
  },

  // Récupérer tous les arrondissements
  getArrondissements: async (): Promise<ArrondissementsResponse> => {
    const response = await apiClient.get("/api/arrondissements");
    return response.data;
  },
};