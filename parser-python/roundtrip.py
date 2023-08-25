from collections import deque
import json

input_file_path = "input.html"
output_file_path = "output.html"
json_file_path = "items.json"

def parse_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.readlines()

    stack = deque()
    parsed_data = []

    for line in content:
        line = line.rstrip()
        if line.startswith('<DL>'):
            stack.append({'type': 'folder_start', 'content': line})
        elif line.startswith('</DL>'):
            stack.append({'type': 'folder_end', 'content': line})
        elif line.startswith('<DT><H3'):
            stack.append({'type': 'folder_title', 'content': line})
        else:
            stack.append({'type': 'other', 'content': line})

    while stack:
        item = stack.popleft()
        parsed_data.append(item)

    return parsed_data

def serialize_data(data):
    serialized_content = ''
    folder_level = 0
    prev_item_type = None

    for item in data:
        item_type = item['type']
        content = item['content']

        if item_type == 'folder_start':
            serialized_content += content
            if folder_level == 1:
                serialized_content += '\n'
            if prev_item_type == 'folder_title':
                folder_level += 1

        elif item_type == 'folder_end':
            serialized_content += content + '\n'
            if folder_level > 0:
                folder_level -= 1

        elif item_type == 'folder_title':
            serialized_content += content + '\n'

        else:
            serialized_content += content + '\n'

        prev_item_type = item_type

    return serialized_content

# Previous part of the code remains unchanged.


# Parsing the file
parsed_data = parse_file(input_file_path)

# Serializing the parsed data
serialized_content = serialize_data(parsed_data)

# Writing the serialized content to a file
with open(output_file_path, 'w', encoding='utf-8') as file:
    file.write(serialized_content)

# Saving the parsed data to a JSON file
with open(json_file_path, 'w', encoding='utf-8') as file:
    json.dump(parsed_data, file, ensure_ascii=False, indent=4)

# Checking the differences again
with open(input_file_path, 'r', encoding="utf-8") as file:
    original_content = file.readlines()

with open(output_file_path, 'r', encoding="utf-8") as file:
    serialized_content = file.readlines()

differences = [f"Line {idx + 1}:\nOriginal: {orig}Serialized: {ser}"
               for idx, (orig, ser) in enumerate(zip(original_content, serialized_content))
               if orig != ser]

# Displaying the first few differences
print(differences[:5], len(differences))
