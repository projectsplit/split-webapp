export interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    readonly userChoice: Promise<{
        outcome: 'accepted' | 'dismissed';
        platform: string;
    }>;
    prompt(): Promise<void>;
}
export declare function usePwaInstall(): {
    isInstallable: boolean;
    isAppInstalled: boolean;
    promptInstall: () => Promise<void>;
    clearPrompt: () => void;
};
