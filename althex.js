// Convert standard hexadecimal string to a custom hexadecimal representation
function toAlthex(hexString, useUppercase) {
  const hexToUpperAlthex = 'GHJKMNPRSTUVWXYZ';
  const hexToLowerAlthex = 'ghjkmnprstuvwxyz';

  // If useUppercase is not provided, determine from the hexString
  if (useUppercase === undefined) {
    useUppercase = hexString.toUpperCase() === hexString;
  }

  let result = '';
  for (const char of hexString) {
    const index = parseInt(char, 16);
    if (!isNaN(index)) {
      result += useUppercase ? hexToUpperAlthex[index] : hexToLowerAlthex[index];
    } else {
      // If the character is not a valid hexadecimal character, add it as is
      result += char;
    }
  }
  return result;
}

// Convert custom hexadecimal string back to standard hexadecimal representation
function fromAlthex(customString, useUppercase) {
  const althexToUpperHex = '0123456789ABCDEF';
  const althexToLowerHex = '0123456789abcdef';
  
  // If useUppercase is not provided, determine from the customString
  if (useUppercase === undefined) {
    useUppercase = customString.toUpperCase() === customString;
  }

  let result = '';
  for (const char of customString) {
    const index = useUppercase ? hexToUpperAlthex.indexOf(char) : hexToLowerAlthex.indexOf(char);
    if (index !== -1) {
      result += useUppercase ? althexToUpperHex[index] : althexToLowerHex[index];
    } else {
      // If the character is not in the custom hexadecimal character set, add it as is
      result += char;
    }
  }
  return result;
}

// Example usage:
const customHex = toAlthex('1A3F'); // should return 'hukz' or 'HUKZ' depending on the case of input
console.log(customHex);

const standardHex = fromAlthex(customHex); // should return '1A3F' or '1a3f' depending on the case of input
console.log(standardHex);
