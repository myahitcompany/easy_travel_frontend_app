import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PersistentStorage, StorageKeys } from "@/utils";
import { LoginPayload } from "utilities";
import apiClient, { setAuthToken } from "@/lib/apiClient";
import { API_ENDPOINTS, APP_ROUTES } from "@/configs";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

export const useLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const from = ((location.state as any)?.from.pathname as string) || "/";

  useEffect(() => {
    if (PersistentStorage.getData(StorageKeys.ESAY_TOKEN_KEY, false)) {
      navigate(APP_ROUTES.ROOT.PATH);
    }
  }, []);

  return useMutation({
    mutationFn: async (data: LoginPayload) => {
      // Convertir les données de login en FormData
      const formData = new FormData();
      Object.keys(data).forEach(key => {
        if (data[key as keyof LoginPayload] !== undefined && data[key as keyof LoginPayload] !== null) {
          formData.append(key, data[key as keyof LoginPayload] as string);
        }
      });

      const response = await apiClient.post(
        `${API_ENDPOINTS.AUTH.LOGIN}`,
        formData
      );
      const token = response.data.data.access_token;

      PersistentStorage.setData(
        StorageKeys.ESAY_TOKEN_KEY,
        response.data.data.access_token
      );

      setAuthToken(token);

      queryClient.invalidateQueries();
      navigate(from ?? "/");
      return response.data;
    },
  });
};
