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
      const response = await apiClient.post(
        `${API_ENDPOINTS.AUTH.LOGIN}`,
        data
      );
      const token = response.data.access_token;

      PersistentStorage.setData(
        StorageKeys.ESAY_TOKEN_KEY,
        response.data.access_token
      );

      setAuthToken(token);

      queryClient.invalidateQueries();
      navigate(from ?? "/");
      return response.data;
    },
  });
};
