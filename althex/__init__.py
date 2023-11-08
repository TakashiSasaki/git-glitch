# TODO: prepare pydoc
def determine_case(input_string):
    # Filter out non-hexadecimal characters
    hex_chars = ''.join(filter(lambda char: char in '0123456789abcdefABCDEF', input_string))
    
    # If no hex characters are present, return None
    if not hex_chars:
        return None

    # Check if the remaining characters are all uppercase or all lowercase
    if hex_chars.islower():
        return False
    elif hex_chars.isupper():
        return True
    else:
        # If there's a mix of uppercase and lowercase hex characters, raise an error
        raise ValueError("Input string must not contain a mix of uppercase and lowercase letters for hexadecimal characters.")


# TODO: prepare pydoc
def to_althex(hex_string, use_uppercase=None):
    # Determine if the output should be uppercase or lowercase based on the input string
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



def from_althex(custom_string, use_uppercase=None):
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
