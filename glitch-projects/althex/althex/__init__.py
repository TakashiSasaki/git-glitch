from .determine_case import is_upper_althex, is_lower_althex, is_upper_stdhex, is_lower_stdhex
from .to_althex import to_althex
from .from_althex import from_althex
__all__ = ["to_althex", "from_althex"]

"""
The althex module provides functions for converting between standard hexadecimal strings and a custom hexadecimal representation. This custom representation uses a subset of the alphabet (G-Z excluding I, O, U, and V) to represent hexadecimal digits to avoid confusion and ensure readability.

The provided functions are:
- `to_althex(hex_string, use_uppercase=None)`: Converts a standard hexadecimal string to the custom representation. If `use_uppercase` is set to True, the output will be in uppercase characters. If set to False, the output will be in lowercase. If not set, the case will be determined based on the input string.
- `from_althex(custom_string, use_uppercase=None)`: Converts a custom hexadecimal string back to the standard hexadecimal representation. The `use_uppercase` parameter functions the same as in `to_althex`.
- `determine_case(input_string)`: Determines whether the hexadecimal characters in the input string are uppercase or lowercase. Returns True for uppercase, False for lowercase, and raises a ValueError if the string contains a mix of both.

The custom hexadecimal representation excludes the characters I and O to avoid confusion with the digits 1 and 0, and U and V are omitted to prevent ambiguity, respecting the choice of characters in Base32 encoding.

This module is designed for applications where human readability of hexadecimal strings is desirable or where a more compact string representation is beneficial.

Author:
    Takashi Sasaki

Contact:
    https://twitter.com/TakashiSasaki

License:
    MIT License

Example usage:
```python
from althex import to_althex, from_althex

# Convert to custom hexadecimal representation
custom_hex = to_althex('1A3F')
print(custom_hex)  # Output: 'hukz'

# Convert back to standard hexadecimal
standard_hex = from_althex(custom_hex)
print(standard_hex)  # Output: '1A3F'
"""





