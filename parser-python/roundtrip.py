from parse_file import parse_file
from serialize_data import serialize_data

input_file_path = 'input.html'
output_file_path = 'output.html'

# Parsing the file
parsed_data = parse_file(input_file_path)

# Serializing the parsed data
serialized_content = serialize_data(parsed_data)

# Writing the serialized content to a file
with open(output_file_path, 'w', encoding='utf-8') as file:
    file.write(serialized_content)

# Checking the differences
with open(input_file_path, 'r', encoding="utf-8") as file:
    original_content = file.readlines()

with open(output_file_path, 'r', encoding="utf-8") as file:
    serialized_content = file.readlines()

differences = [f"Line {idx + 1}:\\nOriginal: {orig}Serialized: {ser}"
               for idx, (orig, ser) in enumerate(zip(original_content, serialized_content))
               if orig != ser]

# Displaying the differences
differences[:5], len(differences)
