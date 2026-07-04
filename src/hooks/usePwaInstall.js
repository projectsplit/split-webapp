import { useState, useEffect } from 'react';
// Capture the event at module level so it persists across component mounts/unmounts
let deferredPromptEvent = null;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPromptEvent = e;
});
export function usePwaInstall() {
    const [installPromptEvent, setInstallPromptEvent] = useState(deferredPromptEvent);
    const [isAppInstalled, setIsAppInstalled] = useState(false);
    useEffect(() => {
        // Check if the app is already installed
        if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
            setIsAppInstalled(true);
        }
        // If the event already fired before this component mounted, pick it up
        if (deferredPromptEvent && !installPromptEvent) {
            setInstallPromptEvent(deferredPromptEvent);
        }
        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault();
            deferredPromptEvent = e;
            setInstallPromptEvent(e);
        };
        const handleAppInstalled = () => {
            deferredPromptEvent = null;
            setInstallPromptEvent(null);
            setIsAppInstalled(true);
            console.log('PWA was installed');
        };
        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        window.addEventListener('appinstalled', handleAppInstalled);
        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
            window.removeEventListener('appinstalled', handleAppInstalled);
        };
    }, []);
    const promptInstall = async () => {
        if (!installPromptEvent) {
            return;
        }
        await installPromptEvent.prompt();
        const { outcome } = await installPromptEvent.userChoice;
        console.log(`User response to the install prompt: ${outcome}`);
        deferredPromptEvent = null;
        setInstallPromptEvent(null);
    };
    const clearPrompt = () => {
        deferredPromptEvent = null;
        setInstallPromptEvent(null);
    };
    return {
        isInstallable: !!installPromptEvent,
        isAppInstalled,
        promptInstall,
        clearPrompt
    };
}
