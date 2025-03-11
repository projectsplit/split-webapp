// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import GlobalStyles from "./styles/global";

import { useEffect, useState } from "react";
import SplashScreen from "./pages/SplashScreen/SplashScreen";
import { useSignal } from "@preact/signals-react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      refetchOnReconnect: false,
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
      {/* <ReactQueryDevtools /> */}
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
