import apiClient from "@/lib/apiClient";
import { CreateUserPayload, UpdateUserPayload, UserResponse, UserDetailResponse } from "../types";

// Fonction utilitaire pour convertir un objet en FormData
const toFormData = (data: Record<string, any>): FormData => {
  const formData = new FormData();
  Object.keys(data).forEach(key => {
    if (data[key] !== undefined && data[key] !== null) {
      formData.append(key, data[key]);
    }
  });
  return formData;
};

export const usersApi = {
  // Récupérer tous les utilisateurs
  getUsers: async (): Promise<UserResponse> => {
    const response = await apiClient.get("/api/v1/users");
    return response.data;
  },

  // Récupérer les détails d'un utilisateur
  getUserById: async (id: number): Promise<UserDetailResponse> => {
    const response = await apiClient.get(`/api/v1/users/${id}`);
    return response.data;
  },

  // Créer un nouvel utilisateur
  createUser: async (userData: CreateUserPayload): Promise<any> => {
    const formData = toFormData(userData);
    const response = await apiClient.post("/api/v1/users", formData);
    return response.data;
  },

  // Mettre à jour un utilisateur
  updateUser: async (id: number, userData: UpdateUserPayload): Promise<any> => {
    const formData = toFormData(userData);
    const response = await apiClient.put(`/api/v1/users/${id}`, formData);
    return response.data;
  },

  // Supprimer un utilisateur
  deleteUser: async (id: number): Promise<any> => {
    const response = await apiClient.delete(`/api/v1/users/${id}`);
    return response.data;
  },

  // Activer/Désactiver un utilisateur
  toggleUserStatus: async (id: number): Promise<any> => {
    const response = await apiClient.put(`/api/v1/users/${id}/toggle-status`);
    return response.data;
  },
};