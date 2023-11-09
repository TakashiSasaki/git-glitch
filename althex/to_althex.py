from determine_case import is_upper_stdhex

def to_althex(hex_string, use_uppercase=None):
    #TODO: docstring should be here
    if use_uppercase is None:
        use_uppercase = is_upper_stdhex(hex_string)

    # Create the translation map based on the determined case
    hex_to_custom_map = str.maketrans(
        '0123456789ABCDEF' + '0123456789abcdef',
        'GHJKMNPRSTUVWXYZ' * 2 if use_uppercase else 'ghjkmnprstuvwxyz' * 2
    )

    # Translate the standard hex string to the custom hex representation
    return hex_string.translate(hex_to_custom_map)
