# __init__.py

def to_althex(hex_string, use_uppercase=False):
    hex_to_custom_map = str.maketrans(
        '0123456789ABCDEF',
        'GHJKMNPRSTUVWXYZ' if use_uppercase else 'ghjkmnprstuvwxyz'
    )
    return hex_string.upper().translate(hex_to_custom_map)

def from_althex(custom_string, use_uppercase=False):
    custom_to_hex_map = str.maketrans(
        'GHJKMNPRSTUVWXYZ' if use_uppercase else 'ghjkmnprstuvwxyz',
        '0123456789ABCDEF'
    )
    return custom_string.translate(custom_to_hex_map)
