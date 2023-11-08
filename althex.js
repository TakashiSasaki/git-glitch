function determine_case(input_string) {
  // Filter out non-hexadecimal characters
  const hex_chars = input_string.replace(/[^0-9a-fA-F]/g, '');

  // If no hex characters are present, return null
  if (hex_chars === '') {
    return null;
  }

  // Check if there are any letters
  const hex_letters = hex_chars.replace(/[^a-fA-F]/g, '');
  if (hex_letters === '') {
    return null; // No letters means case is not applicable
  }

  // Check if the letters are all uppercase or all lowercase
  if (hex_letters.toLowerCase() === hex_letters) {
    return false; // All lowercase
  } else if (hex_letters.toUpperCase() === hex_letters) {
    return true; // All uppercase
  } else {
    // If there's a mix of uppercase and lowercase hex characters, throw an error
    throw new Error("Input string must not contain a mix of uppercase and lowercase letters for hexadecimal characters.");
  }
}



function toAlthex(hexString, useUppercase) {
    const hexToUpperAlthex = 'GHJKMNPRSTUVWXYZ';
    const hexToLowerAlthex = 'ghjkmnprstuvwxyz';

    // Determine the case of the output based on useUppercase parameter
    if (useUppercase === undefined) {
        useUppercase = hexString.toUpperCase() === hexString;
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


// Example usage:
const customHex = toAlthex('1A3F'); // Output should be 'HUKZ' or 'hukz' depending on the case of input
console.log(customHex);

const standardHex = fromAlthex(customHex); // Output should be '1A3F' or '1a3f' depending on the case of input
console.log(standardHex);

// Test cases
function testDetermineCase() {
  console.log("Testing determine_case...");

  const testCases = [
    { input: 'abc123', expected: false },
    { input: 'ABC123', expected: true },
    { input: '', expected: null },
    { input: '1234567890', expected: null },
    { input: 'abcdefABCDEF', expected: null, errorExpected: true },
  ];

  testCases.forEach(testCase => {
    try {
      const result = determine_case(testCase.input);
      console.assert(result === testCase.expected, `Test failed: determine_case('${testCase.input}') should return ${testCase.expected}, got ${result}`);
      console.log(`Test passed: determine_case('${testCase.input}') returned ${result}`);
    } catch (error) {
      if (testCase.errorExpected) {
        console.log(`Test passed: determine_case('${testCase.input}') threw an error as expected`);
      } else {
        console.error(`Test failed: determine_case('${testCase.input}') threw an error: ${error.message}`);
      }
    }
  });

  console.log("All tests completed.");
}

// Run the test cases
testDetermineCase();