import { BeautifulMentionsTheme } from 'lexical-beautiful-mentions';
import { HeadingNode } from '@lexical/rich-text';
import { BeautifulMentionNode } from 'lexical-beautiful-mentions';
export declare const initialConfig: {
    namespace: string;
    theme: {
        text: {
            bold: string;
        };
        beautifulMentions: BeautifulMentionsTheme;
    };
    onError: (error: Error) => void;
    nodes: (typeof HeadingNode | typeof BeautifulMentionNode)[];
};
