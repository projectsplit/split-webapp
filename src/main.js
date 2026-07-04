import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import GlobalStyles from './styles/global';
import { useEffect, useState } from 'react';
import SplashScreen from './pages/SplashScreen/SplashScreen';
import { registerSW } from 'virtual:pwa-register';
if ('serviceWorker' in navigator) {
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
const RootComponent = () => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 400);
        return () => clearTimeout(timer);
    }, []);
    if (isLoading) {
        return _jsx(SplashScreen, {});
    }
    return (_jsx(ThemeProvider, { theme: theme, children: _jsx(App, {}) }));
};
createRoot(document.getElementById('root')).render(
// <StrictMode>
_jsxs(QueryClientProvider, { client: queryClient, children: [_jsx(GlobalStyles, {}), _jsx(RootComponent, {})] })
//  </StrictMode>
);
