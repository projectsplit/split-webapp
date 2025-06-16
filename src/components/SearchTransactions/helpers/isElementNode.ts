import { SerializedBeautifulMentionNode, SerializedElementNode, SerializedLexicalNode } from "../../../types";


export function isElementNode(
  node: SerializedLexicalNode
): node is SerializedElementNode {
  return "children" in node;
}

export function isBeautifulMentionNode(
  node: SerializedLexicalNode
): node is SerializedBeautifulMentionNode {
  return node.type === "beautifulMention" && "data" in node;
}