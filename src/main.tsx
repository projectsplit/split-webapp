import { createRoot } from 'react-dom/client';
import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import App from './App';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import GlobalStyles from './styles/global';
import {  useEffect, useState } from 'react';
import SplashScreen from './pages/SplashScreen/SplashScreen';
import GlobalWarning from './components/GlobalWarning/GlobalWarning';
import {
  isSilentError,
  messageFromError,
  showGlobalWarning,
} from './components/GlobalWarning/globalWarningState';

import { registerSW } from 'virtual:pwa-register';

if ('serviceWorker' in navigator) {
  registerSW({ immediate: true });
}

const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      if (mutation.meta?.errorHandled) return;
      if (isSilentError(error)) return;

      showGlobalWarning(
        messageFromError(error, 'Something went wrong. Please try again.')
      );
    },
  }),
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
      <GlobalWarning />
    </ThemeProvider>
  );
};

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <GlobalStyles />
    <RootComponent />
  </QueryClientProvider>
);
