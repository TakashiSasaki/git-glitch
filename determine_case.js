function determine_case(input_string) {
  const hexChars = input_string.split('').filter(char => /^[0-9a-fA-F]+$/i.test(char));
  if (hexChars.length === 0) return null;

  const isLower = hexChars.every(char => char.toLowerCase() === char);
  const isUpper = hexChars.every(char => char.toUpperCase() === char);

  if (isLower) return false;
  if (isUpper) return true;

  throw new Error("Input string must not contain a mix of uppercase and lowercase letters for hexadecimal characters.");
}

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

// Test cases for determine_case function
function testDetermineCase2() {
  try {
    // Should return false because the hex characters are lowercase
    console.assert(determine_case('abc123') === false, "Test failed: determine_case('abc123') should return false");
    
    // Should return true because the hex characters are uppercase
    console.assert(determine_case('ABC123') === true, "Test failed: determine_case('ABC123') should return true");
    
    // Should return null because there are no hex characters
    console.assert(determine_case('') === null, "Test failed: determine_case('') should return null");
    
    // Should throw an error because there is a mix of cases
    try {
      determine_case('AbC123');
      console.error("Test failed: determine_case('AbC123') should throw an error");
    } catch (error) {
      console.assert(error.message === "Input string must not contain a mix of uppercase and lowercase letters for hexadecimal characters", "Test failed: determine_case('AbC123') should throw a specific error message");
    }
    
    // Should return null because there are no hex characters, despite non-hex characters being present
    console.assert(determine_case('xyz') === null, "Test failed: determine_case('xyz') should return null");
    
    // Add more test cases as needed

    console.log("All tests passed for determine_case.");
  } catch (error) {
    console.error("Test failed with message: " + error);
  }
}