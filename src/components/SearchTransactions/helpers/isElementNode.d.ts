import { SerializedBeautifulMentionNode, SerializedElementNode, SerializedLexicalNode } from '../../../types';
export declare function isElementNode(node: SerializedLexicalNode): node is SerializedElementNode;
export declare function isBeautifulMentionNode(node: SerializedLexicalNode): node is SerializedBeautifulMentionNode;
