def unflatten(array_data, delimiter='.'):
    """
    Unflattens a list of (path, value) tuples into a nested dict/list structure.

    Parameters:
    - array_data (list): A list of (path, value) tuples to unflatten.
    - delimiter (str): The delimiter that was used during flattening.

    Returns:
    - dict/list/primitive: The unflattened data structure.
    """
    root = array_data[0][1]
    if not isinstance(root, (list, dict)):
        return root
    for path, value in array_data[1:]:
        path_parts = path.split(delimiter)
        target = root
        for part in path_parts[:-1]:
            if isinstance(target, list) and part.isnumeric():
                part = int(part)
            target = target[part]
        last_key = path_parts[-1]
        if isinstance(target, list) and last_key.isnumeric():
            last_key = int(last_key)
            while len(target) <= last_key:
                target.append(None)
        target[last_key] = value
    return root
