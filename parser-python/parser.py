# Adjusting the parser and serializer to fix the issue with Line 14 by handling the <DL><p> pattern correctly
input_file_path="export-one.html"
output_file_path="export-one-roundtrip.html"

from typing import List, Tuple

def parse_file(file_path: str) -> List[Tuple[str, str]]:
    with open(file_path, 'r', encoding='utf-8') as file:
        lines = file.readlines()

    parsed_data = []
    current_folder = None

    i = 0
    while i < len(lines):
        line = lines[i].strip()

        if line.startswith("<!DOCTYPE") or line.startswith("<META") or line.startswith("<TITLE>") or line.startswith("<H1>"):
            parsed_data.append(("header", line))
        elif line == "<DL>":
            if lines[i + 1].strip() == "<p>":
                parsed_data.append(("folder_start", "<DL><p>"))
                i += 1  # Skip the next line as it's part of this folder start
            else:
                parsed_data.append(("folder_start", "<DL>"))
        elif line == "</DL>" and lines[i + 1].strip() == "<p>":
            parsed_data.append(("folder_end", "</DL>\n<p>"))
            i += 1  # Skip the next line as it's part of this folder end
        elif line.startswith("<DT><H3"):
            current_folder = line
            parsed_data.append(("folder_name", current_folder))
        else:
            parsed_data.append(("item", line))

        i += 1

    return parsed_data


def serialize_data(parsed_data: List[Tuple[str, str]]) -> str:
    serialized_content = []

    for data_type, content in parsed_data:
        if data_type == "header":
            serialized_content.append(content)
        elif data_type == "folder_start":
            serialized_content.append(content.split("<p>")[0])
            if "<p>" in content:
                serialized_content.append("<p>")
        elif data_type == "folder_end":
            serialized_content.append(content.split("\n")[0])
            serialized_content.append(content.split("\n")[1])
        elif data_type == "folder_name":
            serialized_content.append(content)
        elif data_type == "item":
            serialized_content.append(content)

    return "\n".join(serialized_content)


# Parsing the file
parsed_data = parse_file(input_file_path)

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
differences[:5], len(differences)
