export function isElementNode(node) {
    return 'children' in node;
}
export function isBeautifulMentionNode(node) {
    return node.type === 'beautifulMention' && 'data' in node;
}
