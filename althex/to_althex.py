from determine_case import is_upper_stdhex

def to_althex(hex_string, use_uppercase=None):
    """
    Converts a standard hexadecimal string to a custom hexadecimal representation where digits are mapped to alphabetic characters.

    The function maps 0-9 and A-F (or a-f) to a set of characters from G-Z (or g-z) based on the `use_uppercase` parameter.
    If `use_uppercase` is not explicitly set, the function determines the case based on the input string using `is_upper_stdhex`.
    The output is in uppercase if `use_uppercase` is True, in lowercase if `use_uppercase` is False,
    and determined by `is_upper_stdhex` if `use_uppercase` is None.

    Parameters:
    hex_string (str): The standard hexadecimal string to be converted.
    use_uppercase (bool, optional): Determines the case of the output string. If `True`, the output is in uppercase. 
                                     If `False`, the output is in lowercase. If `None`, the case is inferred from the input string.

    Returns:
    str: The custom hexadecimal representation of the input string with alphabetic characters.
    """    
    # Determine if the output should be uppercase or lowercase based on the input string
    if use_uppercase is None:
        use_uppercase = is_upper_stdhex(hex_string)

    # Create the translation map based on the determined case
    hex_to_custom_map = str.maketrans(
        '0123456789ABCDEF' + '0123456789abcdef',
        'GHJKMNPRSTUVWXYZ' * 2 if use_uppercase else 'ghjkmnprstuvwxyz' * 2
    )

    # Translate the standard hex string to the custom hex representation
    return hex_string.translate(hex_to_custom_map)
