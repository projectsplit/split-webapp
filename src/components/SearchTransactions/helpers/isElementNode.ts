import { SerializedElementNode, SerializedLexicalNode } from "../../../types";


export function isElementNode(
  node: SerializedLexicalNode
): node is SerializedElementNode {
  return "children" in node;
}
