module.exports = function hash(str) {
    if (!str) return 0;

    str = String(str);
    var hash = 5381, i = str.length;
    while (i) {
        hash = (hash * 33) ^ str.charCodeAt(--i);
    }
    return hash >>> 0;
};