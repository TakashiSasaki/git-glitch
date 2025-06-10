from determine_case import is_upper_stdhex

def to_althex(hex_string, use_uppercase=None):
    """
    Converts a standard hexadecimal string to an alternative hexadecimal representation.

    This function takes a standard hexadecimal string and converts it to a custom
    representation where the digits 0-9 and letters A-F are mapped to letters G-Z or g-z,
    depending on the case specified by the `use_uppercase` parameter or inferred from the input.

    If `use_uppercase` is `None` and the input contains mixed case letters, the output will default to lowercase.

    Parameters:
    hex_string (str): The standard hexadecimal string to convert.
    use_uppercase (bool, optional): If set to True, the output uses uppercase letters.
                                    If set to False, the output uses lowercase letters.
                                    If set to None, the case of the output is determined by `is_upper_stdhex` function
                                    and defaults to lowercase if the input contains mixed case.

    Returns:
    str: An alternative hexadecimal string representation of `hex_string`.

    Examples:
    >>> to_althex('1a3f')
    'hukz'
    >>> to_althex('1A3F', use_uppercase=True)
    'HUKZ'
    >>> to_althex('1A3F', use_uppercase=False)
    'hukz'
    >>> to_althex('1a3F')  # Mixed case input without explicit use_uppercase
    'hukz'  # Defaults to lowercase output
    """
    if use_uppercase is None:
        use_uppercase = is_upper_stdhex(hex_string)

    # Create the translation map based on the determined case
    hex_to_custom_map = str.maketrans(
        '0123456789ABCDEF' + '0123456789abcdef',
        'GHJKMNPRSTUVWXYZ' * 2 if use_uppercase else 'ghjkmnprstuvwxyz' * 2
    )

    # Translate the standard hex string to the custom hex representation
    return hex_string.translate(hex_to_custom_map)
