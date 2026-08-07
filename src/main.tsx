// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import GlobalStyles from './styles/global';
import {  useEffect, useState } from 'react';
import SplashScreen from './pages/SplashScreen/SplashScreen';

import { registerSW } from 'virtual:pwa-register';
import { isNativeApp } from './helpers/platform';

// The native shell serves the same bundle from https://localhost, so the worker would register and
// then precache a copy of assets the shell already ships — an second, staler source of truth that
// survives app updates. Native builds get their assets from the APK and their pushes from FCM, so
// the worker has no job there.
if ('serviceWorker' in navigator && !isNativeApp()) {
  registerSW({ immediate: true });
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      staleTime: 15 * 60 * 1000,
      refetchOnMount: true,
    },
  },
});

const RootComponent: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

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

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <QueryClientProvider client={queryClient}>
    <GlobalStyles />
    <RootComponent />
  </QueryClientProvider>
  //  </StrictMode>
);
