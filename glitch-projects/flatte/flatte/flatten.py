def flatten(input_data, path="", delimiter=".", output=None):
    """
    Flattens a nested dict/list structure into a list of tuples.

    Parameters:
    - input_data (dict/list/primitive): The data to flatten.
    - path (str): The current path being processed (used for recursion).
    - delimiter (str): The delimiter to use for concatenating keys.
    - output (list): The list to store the flattened data (used for recursion).

    Returns:
    - list: A list of tuples where each tuple is a (path, value) pair.

    Raises:
    - ValueError: When a key contains the delimiter.
    """
    if output is None:
        output = []

    if isinstance(input_data, dict):
        output.append((path, {}))

        for key, value in input_data.items():
            if not isinstance(key, str):
                raise ValueError(f"Dictionary key must be a string, found {type(key)} instead.")

            new_key = f"{path}{delimiter}{key}" if path else key

            if delimiter in key:
                raise ValueError(f"Key '{key}' contains the delimiter '{delimiter}'.")

            flatten(value, new_key, delimiter, output)

    elif isinstance(input_data, list):
        output.append((path, []))

        for i, value in enumerate(input_data):
            new_key = f"{path}{delimiter}{i}" if path else str(i)
            flatten(value, new_key, delimiter, output)

    else:
        output.append((path, input_data))

    return output
