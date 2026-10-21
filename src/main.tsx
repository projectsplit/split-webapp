import { createRoot } from 'react-dom/client';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import App from './App';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import GlobalStyles from './styles/global';
import {  useEffect, useState } from 'react';
import SplashScreen from './pages/SplashScreen/SplashScreen';
import GlobalWarning from './components/GlobalWarning/GlobalWarning';
import { queryClient } from './api/queryClient';
import { queryCachePersistOptions } from './api/offline/queryCachePersistence';
import { startPendingTransactionSync } from './api/offline/pendingTransactionSync';

import { registerSW } from 'virtual:pwa-register';
import { isNativeApp } from './helpers/platform';

// The native shell serves the same bundle from https://localhost, so the worker would register and
// then precache a copy of assets the shell already ships — an second, staler source of truth that
// survives app updates. Native builds get their assets from the APK and their pushes from FCM, so
// the worker has no job there.
if ('serviceWorker' in navigator && !isNativeApp()) {
  registerSW({ immediate: true });
}

// Expenses and transfers filed without a connection are sent from here on, whichever screen is open.
startPendingTransactionSync();

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
  <PersistQueryClientProvider
    client={queryClient}
    persistOptions={queryCachePersistOptions}
  >
    <GlobalStyles />
    <RootComponent />
  </PersistQueryClientProvider>
);
