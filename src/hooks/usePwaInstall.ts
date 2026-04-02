import { useState, useEffect } from 'react';

// Define the type for the BeforeInstallPromptEvent
// This is not standard in lib.dom.d.ts yet, so we have to define it
export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

// Capture the event at module level so it persists across component mounts/unmounts
let deferredPromptEvent: BeforeInstallPromptEvent | null = null;

window.addEventListener('beforeinstallprompt', (e: Event) => {
  e.preventDefault();
  deferredPromptEvent = e as BeforeInstallPromptEvent;
});

export function usePwaInstall() {
  const [installPromptEvent, setInstallPromptEvent] = useState<BeforeInstallPromptEvent | null>(deferredPromptEvent);
  const [isAppInstalled, setIsAppInstalled] = useState(false);

  useEffect(() => {
    // Check if the app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true) {
      setIsAppInstalled(true);
    }

    // If the event already fired before this component mounted, pick it up
    if (deferredPromptEvent && !installPromptEvent) {
      setInstallPromptEvent(deferredPromptEvent);
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      deferredPromptEvent = e as BeforeInstallPromptEvent;
      setInstallPromptEvent(e as BeforeInstallPromptEvent);
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
  }

  return {
    isInstallable: !!installPromptEvent,
    isAppInstalled,
    promptInstall,
    clearPrompt
  };
}
