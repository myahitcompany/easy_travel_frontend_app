import { API_ENDPOINTS } from "@/configs";
import apiClient from "@/lib/apiClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import {
  PaginatedTrips,
  PaginatedUsers,
  PaginatedVehicles,
  Trip,
  TripPayload,
} from "utilities";

export const useGetTrips = (page = 1) => {
  return useQuery<PaginatedTrips, Error>({
    queryKey: ["trips", page],
    queryFn: async () => {
      const response = await apiClient.get(
        `${API_ENDPOINTS.TRAVEL}?page=${page}`
      );
      return response.data;
    },
  });
};

export const useCreateTrip = () => {
  const queryClient = useQueryClient();

  return useMutation<Trip, AxiosError<{ message?: string }>, TripPayload>({
    mutationFn: async (data) => {
      const response = await apiClient.post(`${API_ENDPOINTS.TRAVEL}`, data);
      queryClient.invalidateQueries(["trips", 1]);
      return response.data;
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message ||
        "Une erreur s'est produite lors de la création d'un voyage";
      toast.error(errorMessage, { autoClose: 3000 });
    },
    onSuccess: () => {
      toast.success("Voyage créé avec succès !", { autoClose: 3000 });
    },
  });
};

export const useUpdateTrip = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation<Trip, AxiosError<{ message?: string }>, TripPayload>({
    mutationFn: async (data) => {
      const response = await apiClient.patch(
        `${API_ENDPOINTS.TRAVEL}/${id}`,
        data
      );
      queryClient.invalidateQueries(["trips", 1]);
      return response.data;
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message ||
        "Une erreur s'est produite lors de la mise à jour des informations d'un voyage";
      toast.error(errorMessage, { autoClose: 3000 });
    },
    onSuccess: () => {
      toast.success("Mise à jour avec succès !", { autoClose: 3000 });
    },
  });
};

export const useDeleteTrip = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<{ message?: string }>, string>({
    mutationFn: async (id: string) => {
      const response = await apiClient.delete(`${API_ENDPOINTS.TRAVEL}/${id}`);
      queryClient.invalidateQueries({ queryKey: ["trips", 1] });
      return response.data;
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message ||
        "Une erreur s'est produite lors de la suppression d'un voyage";
      toast.error(errorMessage, { autoClose: 3000 });
    },
    onSuccess: () => {
      toast.success("Voyage supprimé avec succès !", { autoClose: 3000 });
    },
  });
};

export const useGetUsersList = () => {
  return useQuery<PaginatedUsers, Error>({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await apiClient.get(`${API_ENDPOINTS.USERS}`);
      return response.data;
    },
  });
};

export const useGetVehiclesList = () => {
  return useQuery<PaginatedVehicles, Error>({
    queryKey: ["vehicle"],
    queryFn: async () => {
      const response = await apiClient.get(`${API_ENDPOINTS.VEHICLES}`);
      return response.data;
    },
  });
};

export const useGetCities = () => {
  return useQuery({
    queryKey: ["cities"],
    queryFn: async () => {
      const response = await apiClient.get(`${API_ENDPOINTS.CITIES}`);
      return response.data;
    },
  });
};
