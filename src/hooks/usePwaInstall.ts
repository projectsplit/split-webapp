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

export function usePwaInstall() {
  const [installPromptEvent, setInstallPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [isAppInstalled, setIsAppInstalled] = useState(false);

  useEffect(() => {
    // Check if the app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true) {
      setIsAppInstalled(true);
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setInstallPromptEvent(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      // Clear the deferredPrompt so it can be garbage collected
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
    // Show the install prompt
    await installPromptEvent.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await installPromptEvent.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    // We've used the prompt, and can't use it again, throw it away
    setInstallPromptEvent(null);
  };

  const clearPrompt = () => {
    setInstallPromptEvent(null);
  }

  return {
    isInstallable: !!installPromptEvent,
    isAppInstalled,
    promptInstall,
    clearPrompt
  };
}
