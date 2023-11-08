from .determine_case import is_upper_althex, is_lower_althex, is_upper_stdhex, is_lower_stdhex

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

# Module code follows...


def to_althex(hex_string, use_uppercase=None):
    """
    Converts a standard hexadecimal string to a custom hexadecimal representation where digits are mapped to alphabetic characters.

    The function maps 0-9 and A-F (or a-f) to a set of characters from G-Z (or g-z) based on the `use_uppercase` parameter.
    If `use_uppercase` is not explicitly set, the function determines the case based on the input string.
    If the input string contains a mix of uppercase and lowercase letters, or no letters at all, the function raises an error.

    Parameters:
    hex_string (str): The standard hexadecimal string to be converted.
    use_uppercase (bool, optional): Determines the case of the output string. If `True`, the output is in uppercase. 
                                     If `False`, the output is in lowercase. If `None`, the case is inferred from the input string.

    Returns:
    str: The custom hexadecimal representation of the input string with alphabetic characters.

    Raises:
    ValueError: If the input string contains a mix of uppercase and lowercase letters for hexadecimal characters, or if the case cannot be determined.

    Examples:
    >>> to_althex('1a3f')
    'hukz'
    >>> to_althex('1A3F', use_uppercase=True)
    'HUKZ'
    >>> to_althex('1A3f')
    ValueError: Input string must not contain a mix of uppercase and lowercase letters for hexadecimal characters.
    """    # Determine if the output should be uppercase or lowercase based on the input string
    if use_uppercase is None:
        has_upper = any(char.isupper() for char in hex_string if char.isalpha())
        has_lower = any(char.islower() for char in hex_string if char.isalpha())

        # If both upper and lower case letters are present, or no letters are present, raise an error
        if has_upper and has_lower:
            raise ValueError("Input string must not contain a mix of uppercase and lowercase letters for hexadecimal characters.")
        use_uppercase = has_upper

    # Create the translation map based on the determined case
    hex_to_custom_map = str.maketrans(
        '0123456789ABCDEF' + '0123456789abcdef',
        'GHJKMNPRSTUVWXYZ' * 2 if use_uppercase else 'ghjkmnprstuvwxyz' * 2
    )

    # Translate the standard hex string to the custom hex representation
    return hex_string.translate(hex_to_custom_map)


# TODO: prepare pydoc
def from_althex(custom_string, use_uppercase=None):
    """
    Converts a custom hexadecimal representation back to a standard hexadecimal string. The custom representation
    is where digits are mapped to alphabetic characters from G-Z (or g-z) based on the `use_uppercase` parameter.
    If `use_uppercase` is not explicitly set, the function determines the case based on the input string.
    If the input contains a mix of uppercase and lowercase letters, or no letters at all, the function raises an error.

    Parameters:
    custom_string (str): The custom hexadecimal string to be converted back to standard hexadecimal.
    use_uppercase (bool, optional): Determines the case of the output standard hexadecimal string. If `True`, the output is in uppercase.
                                    If `False`, the output is in lowercase. If `None`, the case is inferred from the input string.

    Returns:
    str: The standard hexadecimal representation of the input custom string.

    Raises:
    ValueError: If the input string contains a mix of uppercase and lowercase letters for hexadecimal characters, or if the case cannot be determined.

    Examples:
    >>> from_althex('hukz')
    '1a3f'
    >>> from_althex('HUKZ')
    '1A3F'
    >>> from_althex('HuKz')
    ValueError: Input string must not contain a mix of uppercase and lowercase letters.
    """

    # Determine the case from the input string if use_uppercase is not set
    if use_uppercase is None:
        if custom_string.islower():
            use_uppercase = False
        elif custom_string.isupper():
            use_uppercase = True
        else:
            # If there's a mix of uppercase and lowercase, or no letters, raise an error
            raise ValueError("Input string must not contain a mix of uppercase and lowercase letters.")

    # Create the translation map based on the determined case
    custom_to_hex_map = str.maketrans(
        'GHJKMNPRSTUVWXYZ' if use_uppercase else 'ghjkmnprstuvwxyz',
        '0123456789ABCDEF' if use_uppercase else '0123456789abcdef'
    )

    # Translate the custom hex string back to standard hex
    return custom_string.translate(custom_to_hex_map)
