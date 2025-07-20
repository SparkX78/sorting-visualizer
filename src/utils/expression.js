export function getBotExpression(message) {
    const lower = message.toLowerCase();
    if (lower.includes('hello') || lower.includes('hi'))
        return '👋';
    if (lower.includes('sort') || lower.includes('algorithm'))
        return '🔢';
    if (lower.includes('error') || lower.includes('bug'))
        return '🐞';
    if (lower.includes('deploy') || lower.includes('github'))
        return '🚀';
    if (lower.includes('confused') || lower.includes('why'))
        return '🤔';
    if (lower.includes('thanks') || lower.includes('thank'))
        return '🙏';
    return '🤖'; // default
}
