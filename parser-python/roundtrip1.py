#from collections import deque
import json

input_file_path = "input.html"
output_file_path = "output.html"
json_file_path = "items.json"

def parse_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.readlines()

    folder_structure = {'type': 'root', 'content': '', 'level': 0, 'items': []}
    current_folder = folder_structure

    for line in content:
        line = line.rstrip()
        if line.startswith('<DL>'):
            new_folder = {'type': 'folder', 'content': '', 'level': current_folder['level'] + 1, 'items': [], 'parent': current_folder}
            current_folder['items'].append(new_folder)
            current_folder = new_folder
            current_folder['items'].append({'type': 'folder_start', 'content': line})
        elif line.startswith('</DL>'):
            current_folder['items'].append({'type': 'folder_end', 'content': line})
            if 'parent' in current_folder:
                current_folder = current_folder['parent']
        elif line.startswith('<DT><H3'):
            current_folder['items'].append({'type': 'folder_title', 'content': line})
        elif line == '<p>':
            current_folder['items'].append({'type': 'paragraph', 'content': line})
        else:
            current_folder['items'].append({'type': 'other', 'content': line})

    return folder_structure



def serialize_data(data):
    serialized_content = ''

    def serialize_item(item):
        nonlocal serialized_content
        if item['type'] in ['folder_start', 'folder_end', 'folder_title', 'paragraph']:
            serialized_content += item['content'] + '\n'
        elif item['type'] == 'other':
            serialized_content += item['content'] + '\n'

        # Recursively serialize child items
        if 'items' in item:
            for sub_item in item['items']:
                serialize_item(sub_item)

    for item in data['items']:
        serialize_item(item)

    return serialized_content


# Parsing the file
parsed_data = parse_file(input_file_path)

def filter_properties(obj):
    # キー 'parent' を無視する
    return {key: value for key, value in obj.items() if key != 'parent'}
  
with open(json_file_path, 'w', encoding='utf-8') as file:
    json.dump(parsed_data, file, ensure_ascii=False, indent=4, default=filter_properties)

# Serializing the parsed data
serialized_content = serialize_data(parsed_data)

# Writing the serialized content to a file
with open(output_file_path, 'w', encoding='utf-8') as file:
    file.write(serialized_content)

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
