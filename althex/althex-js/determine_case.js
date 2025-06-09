const althexChars = new Set('GHJKLMNOPQRSTUVWXYZghjklmnopqrstuvwxyz');
const stdhexChars = new Set('ABCDEFabcdef');

function isUpperAlthex(s) {
    const filteredChars = [...s].filter(c => althexChars.has(c));
    return filteredChars.length > 0 && filteredChars.every(c => c === c.toUpperCase());
}

function isLowerAlthex(s) {
    const filteredChars = [...s].filter(c => althexChars.has(c));
    return filteredChars.length > 0 && filteredChars.every(c => c === c.toLowerCase());
}

function isUpperStdhex(s) {
    const filteredChars = [...s].filter(c => stdhexChars.has(c));
    return filteredChars.length > 0 && filteredChars.every(c => c === c.toUpperCase());
}

function isLowerStdhex(s) {
    const filteredChars = [...s].filter(c => stdhexChars.has(c));
    return filteredChars.length > 0 && filteredChars.every(c => c === c.toLowerCase());
}
