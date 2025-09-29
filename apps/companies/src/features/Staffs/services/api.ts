import { API_ENDPOINTS } from "@/configs";
import apiClient from "@/lib/apiClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateStaffPayload,
  CreateStaffResponse,
  PaginatedGroup,
  PaginatedUsers,
} from "utilities";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export const useGetRoles = () => {
  return useQuery<PaginatedGroup, Error>({
    queryKey: ["roles"],
    queryFn: async () => {
      const response = await apiClient.get(`${API_ENDPOINTS.ROLE}`);
      return response.data;
    },
  });
};

export const useGetUsers = (page = 1) => {
  return useQuery<PaginatedUsers, Error>({
    queryKey: ["users", page],
    queryFn: async () => {
      const response = await apiClient.get(
        `${API_ENDPOINTS.USERS}?page=${page}`
      );
      return response.data;
    },
  });
};

export const useCreateStaff = () => {
  const queryClient = useQueryClient();

  return useMutation<CreateStaffResponse, AxiosError<{ message?: string }>, CreateStaffPayload>({
    mutationFn: async (data) => {
      const response = await apiClient.post(
        `${API_ENDPOINTS.STAFFS.REGISTER}`,
        data
      );
      queryClient.invalidateQueries(["users", 1]);
      return response.data;
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message ||
        "Une erreur s'est produite lors de la création de l'employé";
      toast.error(errorMessage, { autoClose: 3000 });
    },
    onSuccess: () => {
      toast.success("Employé créé avec succès !", { autoClose: 3000 });
    },
  });
};

export const useUpdateStaff = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation<CreateStaffResponse,AxiosError<{ message?: string }>, CreateStaffPayload>({
    mutationFn: async (data) => {
      const response = await apiClient.patch(
        `${API_ENDPOINTS.USERS}/${id}`,
        data
      );
      queryClient.invalidateQueries(["users", 1]);
      return response.data;
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message ||
        "Une erreur s'est produite lors de la mise à jour des informations de l'employé";
      toast.error(errorMessage, { autoClose: 3000 });
    },
    onSuccess: () => {
      toast.success("Mise à jour avec succès !", { autoClose: 3000 });
    },
  });
};

export const useDeleteStaff = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<{ message?: string }>, string>({
    mutationFn: async (id: string) => {
      const response = await apiClient.delete(`${API_ENDPOINTS.USERS}/${id}`);
      queryClient.invalidateQueries({ queryKey: ["users", 1] });
      return response.data;
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message ||
        "Une erreur s'est produite lors de la suppression de l'employé";
      toast.error(errorMessage, { autoClose: 3000 });
    },
    onSuccess: () => {
      toast.success("Employé supprimé avec succès !", { autoClose: 3000 });
    },
  });
};