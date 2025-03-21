// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import GlobalStyles from "./styles/global";
import { useEffect, useState } from "react";
import SplashScreen from "./pages/SplashScreen/SplashScreen";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      staleTime: 15 * 60 * 1000,
      refetchOnMount: false,
    },
  },
});

const RootComponent: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {}, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <ThemeProvider theme={theme}>
      <App />
      <ReactQueryDevtools />
    </ThemeProvider>
  );
};

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <QueryClientProvider client={queryClient}>
    <GlobalStyles />
    <RootComponent />
  </QueryClientProvider>
  // </StrictMode>,
);
