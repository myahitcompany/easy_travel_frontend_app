import { useEffect } from "react";
import { MetaContextProvider } from "./context";
import { AppRoutes } from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { initializeApiClient } from "./lib";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";

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
      <ReactQueryDevtools initialIsOpen={true} />
      <ToastContainer />
      <MetaContextProvider>
        <AppRoutes />
      </MetaContextProvider>
    </QueryClientProvider>
  );
}
