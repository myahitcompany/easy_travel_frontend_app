import { useMemo } from "react";

export const useFormatDate = (date: string) => {
  return useMemo(() => {
    if (date) {
      const dateObj = new Date(date);
      return dateObj.toISOString().slice(0, 19); // 'YYYY-MM-DDTHH:MM:SS'
    }
    return "";
  }, [date]);
};
