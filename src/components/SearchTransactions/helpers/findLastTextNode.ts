import { SerializedLexicalNode } from "../../../types";


export function findLastTextNode(
    children: SerializedLexicalNode[]
  ): SerializedLexicalNode | null {
    for (let i = children.length - 1; i >= 0; i--) {
      if (children[i].type === "text") {
        return children[i];
      }
    }
    return null;
  }