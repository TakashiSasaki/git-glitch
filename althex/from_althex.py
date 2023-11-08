from determine_case import is_upper_althex

def from_althex(custom_string, use_uppercase=None):
    """
    Converts a custom hexadecimal representation back to a standard hexadecimal string. 
    The custom representation is where digits are mapped to alphabetic characters from G-Z (or g-z) based on the `use_uppercase` parameter.
    If `use_uppercase` is not explicitly set, the function determines the case based on the input string using `is_upper_althex`.
    The output is in uppercase if `use_uppercase` is True, in lowercase if `use_uppercase` is False,
    and determined by `is_upper_althex` if `use_uppercase` is None.

    Parameters:
    custom_string (str): The custom hexadecimal string to be converted back to standard hexadecimal.
    use_uppercase (bool, optional): Determines the case of the output standard hexadecimal string. If `True`, the output is in uppercase.
                                    If `False`, the output is in lowercase. If `None`, the case is inferred from the input string.

    Returns:
    str: The standard hexadecimal representation of the input custom string.
    """

    # Determine the case from the input string if use_uppercase is not set
    if use_uppercase is None:
        use_uppercase = is_upper_althex(custom_string)

    # Create the translation map based on the determined case
    custom_to_hex_map = str.maketrans(
        'GHJKMNPRSTUVWXYZ' + 'ghjkmnprstuvwxyz',
        '0123456789ABCDEF' * 2 if use_uppercase  else '0123456789abcdef' * 2
    )

    # Translate the custom hex string back to standard hex
    return custom_string.translate(custom_to_hex_map)
