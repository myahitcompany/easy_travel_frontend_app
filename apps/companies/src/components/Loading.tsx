import { CircularProgress } from "@mui/material";

export function Loading() {
  return (
    <div className="flex flex-row w-full h-screen gap-2 items-center justify-center">
      <CircularProgress />
    </div>
  );
}
