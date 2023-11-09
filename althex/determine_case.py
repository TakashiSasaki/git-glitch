# Redefine the functions after the reset.

althex_chars = set('GHJKLMNOPQRSTUVWXYZghjklmnopqrstuvwxyz')
stdhex_chars = set('ABCDEFabcdef')

def is_upper_althex(s):
    filtered_chars = set(filter(althex_chars.__contains__, s))
    return bool(filtered_chars) and "".join(filtered_chars).isupper()


def is_lower_althex(s):
    filtered_chars = set(filter(althex_chars.__contains__, s))
    return bool(filtered_chars) and "".join(filtered_chars).islower()


def is_upper_stdhex(s):
    filtered_chars = set(filter(stdhex_chars.__contains__, s))
    return bool(filtered_chars) and "".join(filtered_chars).isupper()


def is_lower_stdhex(s):
    stdhex_chars = set('abcdef')
    filtered_chars = set(filter(stdhex_chars.__contains__, s))
    return bool(filtered_chars) and "".join(filtered_chars).islower()
