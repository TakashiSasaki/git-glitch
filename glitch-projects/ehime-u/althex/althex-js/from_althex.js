function fromAlthex(althexString, useUppercase = null) {
    // Helper function to determine if the string is upper althex
    function isUpperAlthex(s) {
        const althexChars = new Set('GHJKLMNOPQRSTUVWXYZ');
        const filteredChars = [...s].filter(c => althexChars.has(c));
        return filteredChars.length === s.length && filteredChars.every(c => c === c.toUpperCase());
    }

    // Determine the case from the input string if useUppercase is not set
    if (useUppercase === null) {
        useUppercase = isUpperAlthex(althexString) && althexString === althexString.toUpperCase();
    }

    // Create the translation map based on the determined case
    const althexMapUpper = { 'G': '0', 'H': '1', 'J': '2', 'K': '3', 'M': '4', 'N': '5', 'P': '6', 'R': '7', 'S': '8', 'T': '9', 'U': 'A', 'V': 'B', 'W': 'C', 'X': 'D', 'Y': 'E', 'Z': 'F' };
    const althexMapLower = { 'g': '0', 'h': '1', 'j': '2', 'k': '3', 'm': '4', 'n': '5', 'p': '6', 'r': '7', 's': '8', 't': '9', 'u': 'a', 'v': 'b', 'w': 'c', 'x': 'd', 'y': 'e', 'z': 'f' };

    // Translate the althex string back to standard hex
    return [...althexString].map(c => {
        if (useUppercase) {
            return althexMapUpper[c.toUpperCase()] || c;
        } else {
            return althexMapLower[c.toLowerCase()] || c;
        }
    }).join('');
}
