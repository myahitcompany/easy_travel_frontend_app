import apiClient from "@/lib/apiClient";
import { CreateLinePayload, UpdateLinePayload, LineResponse, LineDetailResponse, PopularLinesResponse } from "../types";

export const linesApi = {
  // Récupérer toutes les lignes
  getLines: async (page: number = 1, limit: number = 50): Promise<LineResponse> => {
    const response = await apiClient.get("/api/v1/lines", {
      params: { page, limit }
    });
    return response.data;
  },

  // Récupérer les lignes populaires
  getPopularLines: async (limit: number = 10): Promise<PopularLinesResponse> => {
    const response = await apiClient.get("/api/v1/lines/popular", {
      params: { limit }
    });
    return response.data;
  },

  // Récupérer les détails d'une ligne
  getLineById: async (id: string): Promise<LineDetailResponse> => {
    const response = await apiClient.get(`/api/v1/lines/${id}`);
    return response.data;
  },

  // Créer une nouvelle ligne
  createLine: async (lineData: CreateLinePayload): Promise<LineDetailResponse> => {
    const response = await apiClient.post("/api/v1/lines", lineData);
    return response.data;
  },

  // Mettre à jour une ligne
  updateLine: async (id: string, lineData: UpdateLinePayload): Promise<LineDetailResponse> => {
    const response = await apiClient.put(`/api/v1/lines/${id}`, lineData);
    return response.data;
  },

  // Supprimer une ligne
  deleteLine: async (id: string): Promise<any> => {
    const response = await apiClient.delete(`/api/v1/lines/${id}`);
    return response.data;
  },

  // Activer/Désactiver une ligne
  toggleLineStatus: async (id: string): Promise<LineDetailResponse> => {
    const response = await apiClient.put(`/api/v1/lines/${id}/toggle-status`);
    return response.data;
  },
};