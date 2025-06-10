function toAlthex(hexString, useUppercase = null) {
    // Helper function to determine if the string is upper stdhex
    function isUpperStdhex(s) {
        const stdhexChars = new Set('ABCDEF');
        const filteredChars = [...s].filter(c => stdhexChars.has(c));
        return filteredChars.length === s.length && filteredChars.every(c => c === c.toUpperCase());
    }

    // Determine the case from the input string if useUppercase is not set
    if (useUppercase === null) {
        useUppercase = isUpperStdhex(hexString) && hexString === hexString.toUpperCase();
    }

    // Create the translation map based on the determined case
    const stdhexMap = '0123456789abcdef';
    const althexMapUpper = 'GHJKMNPRSTUVWXYZ';
    const althexMapLower = 'ghjkmnprstuvwxyz';

    // Translate the standard hex string to the custom hex representation
    return [...hexString].map(c => {
        const index = stdhexMap.indexOf(c.toLowerCase());
        if (index !== -1) {
            return useUppercase ? althexMapUpper[index] : althexMapLower[index];
        }
        return c;
    }).join('');
}
