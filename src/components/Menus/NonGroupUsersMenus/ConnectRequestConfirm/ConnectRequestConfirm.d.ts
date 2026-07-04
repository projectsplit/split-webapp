type ConnectRequestConfirmProps = {
    username: string;
    isLoading: boolean;
    onConfirm: () => void;
    onCancel: () => void;
};
/**
 * One-time confirmation before splitting expenses with a user you have
 * never interacted with. Sends them a connection request to accept.
 */
export default function ConnectRequestConfirm({ username, isLoading, onConfirm, onCancel, }: ConnectRequestConfirmProps): import("react/jsx-runtime").JSX.Element;
export {};
