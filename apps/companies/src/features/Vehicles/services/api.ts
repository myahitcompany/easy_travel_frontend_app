import { API_ENDPOINTS } from "@/configs";
import apiClient from "@/lib/apiClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { PaginatedVehicles, Vehicle, VehicleResponse } from "utilities";

export const useGetVehicles = (page = 1) => {
  return useQuery<PaginatedVehicles, Error>({
    queryKey: ["vehicle", page],
    queryFn: async () => {
      const response = await apiClient.get(
        `${API_ENDPOINTS.VEHICLES}?page=${page}`
      );
      return response.data;
    },
  });
};

export const useCreateVehicle = () => {
  const queryClient = useQueryClient();

  return useMutation<Vehicle, AxiosError<{ message?: string }>, VehicleResponse>({
    mutationFn: async (data) => {
      const response = await apiClient.post(`${API_ENDPOINTS.VEHICLES}`, data);
      queryClient.invalidateQueries(["vehicle", 1]);
      return response.data;
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message ||
        "Une erreur s'est produite lors de la création d'un véhicule";
      toast.error(errorMessage, { autoClose: 3000 });
    },
    onSuccess: () => {
      toast.success("Véhicule créé avec succès !", { autoClose: 3000 });
    },
  });
};

export const useUpdateVehicle = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation<Vehicle, AxiosError<{ message?: string }>, VehicleResponse>({
    mutationFn: async (data) => {
      const response = await apiClient.patch(
        `${API_ENDPOINTS.VEHICLES}/${id}`,
        data
      );
      queryClient.invalidateQueries(["vehicle", 1]);
      return response.data;
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message ||
        "Une erreur s'est produite lors de la mise à jour des informations d'un véhicule";
      toast.error(errorMessage, { autoClose: 3000 });
    },
    onSuccess: () => {
      toast.success("Mise à jour avec succès !", { autoClose: 3000 });
    },
  });
};


export const useDeleteVehicule = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<{ message?: string }>, string>({
    mutationFn: async (id: string) => {
      const response = await apiClient.delete(`${API_ENDPOINTS.VEHICLES}/${id}`);
      queryClient.invalidateQueries({ queryKey: ["vehicle", 1] });
      return response.data;
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message ||
        "Une erreur s'est produite lors de la suppression d'un véhicule";
      toast.error(errorMessage, { autoClose: 3000 });
    },
    onSuccess: () => {
      toast.success("Véhicule supprimé avec succès !", { autoClose: 3000 });
    },
  });
};