export function limitarString(str, limite) {
    if (!str) return str;
    if (str.length <= limite) {
        return str;
    }
    return str.substring(0, limite-3) + '...';
};