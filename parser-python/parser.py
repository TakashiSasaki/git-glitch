import json

def parse_file(file_path):
    with open(file_path, 'r', encoding="utf-8") as file:
        lines = file.readlines()

    result = []
    folder_stack = [result]
    is_first_folder = True

    for line in lines:
        line = line.rstrip("\n")
        if line.startswith("<DT><H3"):
            folder = {
                "type": "folder",
                "content": line,
                "items": []
            }
            folder_stack[-1].append(folder)
            folder_stack.append(folder["items"])
            is_first_folder = False
        elif line == "<DL>":
            if is_first_folder:
                folder_stack[-1].append(line)
                is_first_folder = False
            else:
                folder_stack[-1].append(line + "<p>")
        elif line == "<p>" and not is_first_folder:
            continue
        elif line == "</DL>" and folder_stack[-1][-1] != "</DL>":
            folder_stack[-1].append(line + "<p>")
            folder_stack.pop()
        else:
            folder_stack[-1].append(line)

    return result

def serialize_data(data):
    serialized_lines = []
    for item in data:
        if isinstance(item, str):
            serialized_lines.append(item)
        elif isinstance(item, dict) and item["type"] == "folder":
            serialized_lines.append(item["content"])
            serialized_lines.append("<DL><p>")
            serialized_lines.extend(serialize_data(item["items"]))
            serialized_lines.append("</DL><p>")
    return "\n".join(serialized_lines)

input_file_path = "input.html"
output_file_path = "output.html"
json_file_path = "items.json"

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
differences[:5], len(differences)
