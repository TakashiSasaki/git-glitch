def determine_case(input_string):
    # 16進数のアルファベットのみを抽出
    hex_chars = ''.join(filter(lambda x: x.isalpha(), input_string))
    # ケースを判断
    if hex_chars.islower():
        return False
    elif hex_chars.isupper():
        return True
    elif hex_chars.isalpha() and not hex_chars.islower() and not hex_chars.isupper():
        raise ValueError("Input string must not contain a mix of uppercase and lowercase letters for hexadecimal characters.")
    else:
        return None

def to_althex(hex_string, use_uppercase=None):
    # Determine if the output should be uppercase or lowercase
    # If use_uppercase is None, determine case based on the input string
    if use_uppercase is None:
        use_uppercase = determine_case(hex_string)
    
    # If the input string contains no hexadecimal characters, we default to lowercase
    if use_uppercase is None:
        use_uppercase = False

    # Create the translation map based on the determined case
    hex_to_custom_map = str.maketrans(
        '0123456789ABCDEF' + '0123456789abcdef',
        'GHJKMNPRSTUVWXYZ' * 2 if use_uppercase else 'ghjkmnprstuvwxyz' * 2
    )

    # Translate the standard hex string to the custom hex representation
    return hex_string.translate(hex_to_custom_map)


def from_althex(custom_string, use_uppercase=None):
    # Determine if the output should be uppercase or lowercase
    # If use_uppercase is None, determine case based on the input string
    use_uppercase = determine_case(custom_string) if use_uppercase is None else use_uppercase

    # Create the translation map based on the determined case
    custom_to_hex_map = str.maketrans(
        'GHJKMNPRSTUVWXYZ' if use_uppercase else 'ghjkmnprstuvwxyz',
        '0123456789ABCDEF' if use_uppercase else '0123456789abcdef'
    )

    # Translate the custom hex string back to standard hex
    result = custom_string.translate(custom_to_hex_map)

    # Return the result in the correct case
    return result.upper() if use_uppercase else result.lower()
