import { API_ENDPOINTS } from "@/configs";
import apiClient from "@/lib/apiClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import {
  Booking,
  BookingPayload,
  PaginatedBookings,
  PaginatedTrips,
} from "utilities";

export const useGetBookings = (page = 1) => {
  return useQuery<PaginatedBookings, Error>({
    queryKey: ["bookings", page],
    queryFn: async () => {
      const response = await apiClient.get(
        `${API_ENDPOINTS.BOOKINGS}?page=${page}`
      );
      return response.data;
    },
  });
};

export const useGetTripsList = () => {
  return useQuery<PaginatedTrips, Error>({
    queryKey: ["trips"],
    queryFn: async () => {
      const response = await apiClient.get(`${API_ENDPOINTS.TRAVEL}`);
      return response.data;
    },
  });
};

export const useCreateBookings = () => {
  const queryClient = useQueryClient();

  return useMutation<Booking, AxiosError<{ message?: string }>, BookingPayload>({
    mutationFn: async (data) => {
      const response = await apiClient.post(`${API_ENDPOINTS.BOOKINGS}`, data);
      queryClient.invalidateQueries(["bookings", 1]);
      return response.data;
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message ||
        "Une erreur s'est produite lors de la réservation d'un voyage ";
      toast.error(errorMessage, { autoClose: 3000 });
    },
    onSuccess: () => {
      toast.success("Réservation créé avec succès !", { autoClose: 3000 });
    },
  });
};

export const useUpdateBooking = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation<Booking, AxiosError<{ message?: string }>, BookingPayload>({
    mutationFn: async (data) => {
      const response = await apiClient.patch(
        `${API_ENDPOINTS.BOOKINGS}/${id}`,
        data
      );
      queryClient.invalidateQueries(["bookings", 1]);
      return response.data;
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message ||
        "Une erreur s'est produite lors de la mise à jour des informations d'une réservation";
      toast.error(errorMessage, { autoClose: 3000 });
    },
    onSuccess: () => {
      toast.success("Mise à jour avec succès !", { autoClose: 3000 });
    },
  });
};

export const useDeleteBooking = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<{ message?: string }>, string>({
    mutationFn: async (id: string) => {
      const response = await apiClient.delete(`${API_ENDPOINTS.BOOKINGS}/${id}`);
      queryClient.invalidateQueries({ queryKey: ["bookings", 1] });
      return response.data;
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message ||
        "Une erreur s'est produite lors de la suppression d'une réservation";
      toast.error(errorMessage, { autoClose: 3000 });
    },
    onSuccess: () => {
      toast.success("Voyage supprimé avec succès !", { autoClose: 3000 });
    },
  });
};
