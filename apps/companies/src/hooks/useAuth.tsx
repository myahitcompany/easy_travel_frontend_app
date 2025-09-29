import { useMemo } from "react";
import { StorageKeys, PersistentStorage } from "@/utils";
import { User } from "utilities";

export const useAuth = () => {
  const token = PersistentStorage.getData(StorageKeys.ESAY_TOKEN_KEY, false);
  const account = PersistentStorage.getData(StorageKeys.ESAY_STORAGE_KEY);
  return useMemo<{ account?: User; token: string }>(
    () => ({ account: account?.user, token }),
    [account, token]
  );
};
