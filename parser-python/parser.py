# Full code for parsing and serializing the Netscape bookmark file

def parse_bookmark_file(file_path):
    with open(file_path, 'r', encoding="utf-8") as file:
        content = file.read()
    
    def extract_items_and_subfolders(data):
        items = []
        folders = []
        folder_name = ""
        folder_attributes = ""
        in_folder = False
        for line in data:
            if line.startswith("<DT><H3"):
                in_folder = True
                folder_start = line.find(">", line.find("<H3")) + 1
                folder_end = line.find("</H3>")
                folder_name = line[folder_start:folder_end]
                folder_attributes = line[line.find("<H3"):folder_start - 1]
            elif line.startswith("<DL><p>"):
                in_folder = False
                folder_data = data[data.index(line) + 1:data.index("</DL><p>") if "</DL><p>" in data else None]
                subfolders, subitems = extract_items_and_subfolders(folder_data)
                folders.append({
                    "name": folder_name,
                    "attributes": folder_attributes,
                    "folders": subfolders,
                    "items": subitems
                })
            elif in_folder and line.startswith("<DT><A"):
                items.append(line)
        return folders, items
    
    header_end = content.find("<H1>")
    header = content[:header_end].strip()
    bookmark_data = content[header_end:].split("\n")
    
    folders, items = extract_items_and_subfolders(bookmark_data[2:])
    root_folder = {
        "name": "root",
        "folders": folders,
        "items": items
    }
    
    return header, root_folder

def serialize_to_netscape_format(folder):
    result = ""
    if folder["name"] != "root":
        result += f'<DT><H3{folder["attributes"]}>{folder["name"]}</H3>\n'
    result += "<DL>\n<p>\n"
    for item in folder["items"]:
        result += f'{item}\n'
    for subfolder in folder["folders"]:
        result += serialize_to_netscape_format(subfolder)
    if folder["name"] != "root":
        result += "</DL>\n<p>\n"
    else:
        result += "</DL><p>\n"
    return result

input_file_path = "export-one.html"
output_file_path = "export-one-roundtrip.html"

# Parsing the Netscape bookmark file
parsed_header, parsed_structure = parse_bookmark_file(input_file_path)

# Serializing the parsed hierarchical structure
serialized_content = serialize_to_netscape_format(parsed_structure)
final_serialized_content = parsed_header + "\n<H1>Bookmarks</H1>\n" + serialized_content

# Writing the serialized content to a file
with open(output_file_path, 'w', encoding="utf-8") as file:
    file.write(final_serialized_content)

output_file_path
