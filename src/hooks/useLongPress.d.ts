export declare function useLongPress(onLongPress: () => void): {
    onTouchStart: (e: React.TouchEvent) => void;
    onTouchEnd: () => void;
    onTouchMove: (e: React.TouchEvent) => void;
    onClickCapture: (e: React.MouseEvent) => void;
};
