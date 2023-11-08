# Redefine the functions after the reset.

def is_upper_althex(s):
    """
    Check if all althex characters in the string are uppercase (G-Z).
    """
    althex_chars = set('GHJKLMNOPQRSTUVWXYZ')
    filtered_chars = set(filter(althex_chars.__contains__, s))
    return bool(filtered_chars) and filtered_chars.issubset(althex_chars)


def is_lower_althex(s):
    """
    Check if all althex characters in the string are lowercase (g-z).
    """
    althex_chars = set('ghjklmnopqrstuvwxyz')
    filtered_chars = set(filter(althex_chars.__contains__, s))
    return bool(filtered_chars) and filtered_chars.issubset(althex_chars)


def is_upper_stdhex(s):
    """
    Check if all standard hex characters in the string are uppercase (A-F).
    """
    stdhex_chars = set('ABCDEF')
    filtered_chars = set(filter(stdhex_chars.__contains__, s))
    return bool(filtered_chars) and filtered_chars.issubset(stdhex_chars)


def is_lower_stdhex(s):
    """
    Check if all standard hex characters in the string are lowercase (a-f).
    """
    stdhex_chars = set('abcdef')
    filtered_chars = set(filter(stdhex_chars.__contains__, s))
    return bool(filtered_chars) and filtered_chars.issubset(stdhex_chars)

