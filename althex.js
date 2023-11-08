



function toAlthex(hexString, useUppercase) {
  const hexToUpperAlthex = 'GHJKMNPRSTUVWXYZ';
  const hexToLowerAlthex = 'ghjkmnprstuvwxyz';

  // Use determine_case to set useUppercase if it's not explicitly provided
  if (useUppercase === undefined) {
    const caseDetermination = determine_case(hexString);
    if (caseDetermination !== null) {
      useUppercase = caseDetermination;
    } else {
      // Default to lowercase if no hexadecimal characters are present
      useUppercase = false;
    }
  }

  // Convert the hexadecimal string to the custom alphabet representation
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



function fromAlthex(customString, useUppercase) {
    const althexToUpperHex = '0123456789ABCDEF';
    const althexToLowerHex = '0123456789abcdef';
    const upperAlthexMap = [...'GHJKMNPRSTUVWXYZ'];
    const lowerAlthexMap = [...'ghjkmnprstuvwxyz'];

    if (useUppercase === undefined) {
        useUppercase = customString.toUpperCase() === customString;
    }

    let result = '';
    for (const char of customString) {
        const index = useUppercase ? upperAlthexMap.indexOf(char.toUpperCase()) : lowerAlthexMap.indexOf(char);
        if (index !== -1) {
            result += useUppercase ? althexToUpperHex[index] : althexToLowerHex[index];
        } else {
            throw new Error(`Invalid character for custom hexadecimal: ${char}`);
        }
    }
    return result;
}

