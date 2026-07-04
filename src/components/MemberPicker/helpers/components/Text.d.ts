interface TextProps {
    description: string;
    selectedCount: number;
    selectedMembers: {
        id: string;
        name: string;
    }[];
    isEquallySplit: boolean;
    error: string | undefined;
}
declare const Text: import("react").NamedExoticComponent<TextProps>;
export default Text;
