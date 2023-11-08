// Convert standard hexadecimal string to a custom hexadecimal representation
function toAlthex(hexString, useUppercase) {
  const hexToUpperAlthex = 'GHJKMNPRSTUVWXYZ';
  const hexToLowerAlthex = 'ghjkmnprstuvwxyz';

  // If useUppercase is not provided (undefined), determine the case from the hexString
  if (useUppercase === undefined) {
    useUppercase = hexString.toUpperCase() === hexString && hexString.toLowerCase() !== hexString;
  }

  let result = '';
  for (const char of hexString) {
    const index = parseInt(char, 16);
    if (!isNaN(index)) {
      result += useUppercase ? hexToUpperAlthex[index] : hexToLowerAlthex[index];
    } else {
      throw new Error(`Invalid character for hexadecimal: ${char}`);
    }
  }
  return result;
}




// Convert custom hexadecimal string back to standard hexadecimal representation
function fromAlthex(customString, useUppercase) {
  const althexToUpperHex = '0123456789ABCDEF';
  const althexToLowerHex = '0123456789abcdef';
  const upperAlthexMap = [...'GHJKMNPRSTUVWXYZ'];
  const lowerAlthexMap = [...'ghjkmnprstuvwxyz'];

  // Determine if the output should be uppercase based on the input string if useUppercase is not defined
  if (useUppercase === undefined) {
    useUppercase = (customString.toUpperCase() === customString);
  }

  let result = '';
  for (const char of customString) {
    const index = useUppercase ? upperAlthexMap.indexOf(char) : lowerAlthexMap.indexOf(char);
    if (index !== -1) {
      result += useUppercase ? althexToUpperHex[index] : althexToLowerHex[index];
    } else {
      throw new Error(`Invalid character for custom hexadecimal: ${char}`);
    }
  }
  return result;
}

// Example usage:
const customHex = toAlthex('1A3F', false); // should return 'hukz'
console.log(customHex); // Output: hukz

const standardHex = fromAlthex(customHex, false); // should return '1a3f'
console.log(standardHex); // Output: 1a3f
