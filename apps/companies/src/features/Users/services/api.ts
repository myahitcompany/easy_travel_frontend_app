import apiClient from "@/lib/apiClient";
import { CreateUserPayload, UpdateUserPayload, UserResponse, UserDetailResponse } from "../types";

export const usersApi = {
  // Récupérer tous les utilisateurs
  getUsers: async (): Promise<UserResponse> => {
    const response = await apiClient.get("/api/v1/users/");
    return response.data;
  },

  // Récupérer les détails d'un utilisateur
  getUserById: async (id: number): Promise<UserDetailResponse> => {
    const response = await apiClient.get(`/api/v1/users/${id}`);
    return response.data;
  },

  // Créer un nouvel utilisateur
  createUser: async (userData: CreateUserPayload): Promise<any> => {
    const response = await apiClient.post("/api/v1/users", userData);
    return response.data;
  },

  // Mettre à jour un utilisateur
  updateUser: async (id: number, userData: UpdateUserPayload): Promise<any> => {
    const response = await apiClient.put(`/api/v1/users/${id}`, userData);
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