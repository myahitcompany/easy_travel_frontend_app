import { useEffect } from "react";
import { AppRoutes } from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { initializeApiClient } from "./lib";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  });

  useEffect(() => {
    initializeApiClient();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen={true} /> */}
      <AppRoutes />
    </QueryClientProvider>
  );
}
