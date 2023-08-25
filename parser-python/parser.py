# Complete code for parsing and serializing the Netscape Bookmark format

from html import unescape

# Parsing function
def parse_bookmark_file_hierarchical(file_content):
    root_folder = {"name": "root", "items": [], "folders": [], "attributes": ""}
    folder_stack = [root_folder]
    lines = iter(file_content.splitlines())
    
    for line in lines:
        line = line.strip()
        if line.startswith("<DT><H3"):
            folder_attributes = line[line.find("<H3") + 3: line.find(">", line.find("<H3"))]
            folder_name = unescape(line[line.find(">", line.find("<H3")) + 1: line.find("</H3>")])
            new_folder = {"name": folder_name, "items": [], "folders": [], "attributes": folder_attributes}
            folder_stack[-1]["folders"].append(new_folder)
            folder_stack.append(new_folder)
        elif line.startswith("<DL><p>"):
            continue
        elif line.startswith("</DL><p>"):
            folder_stack.pop()
        elif line.startswith("<DT><A"):
            item_string = line
            line = next(lines, "").strip()
            while line and not line.startswith("</DT>"):
                item_string += line
                line = next(lines, "").strip()
            folder_stack[-1]["items"].append(unescape(item_string))
    return root_folder

# Serializing function
def serialize_to_netscape_format(folder):
    result = ""
    if folder["name"] != "root":
        result += f'<DT><H3{folder["attributes"]}>{folder["name"]}</H3>\n'
        result += "<DL><p>\n"
    for item in folder["items"]:
        result += f'{item}\n'
    for subfolder in folder["folders"]:
        result += serialize_to_netscape_format(subfolder)
    if folder["name"] != "root":
        result += "</DL><p>\n"
    return result

# Reading the bookmark file
file_path = "./export-one.html"
with open(file_path, 'r', encoding="utf-8") as file:
    file_content = file.read()

# Parsing the header separately
serialized_header = "\n".join(file_content.splitlines()[:6])

# Parsing the bookmark file into a hierarchical structure
parsed_structure = parse_bookmark_file_hierarchical(file_content)

# Serializing the parsed hierarchical structure back to Netscape Bookmark format
serialized_content = serialize_to_netscape_format(parsed_structure)
final_serialized_content = serialized_header + "<H1>Bookmarks</H1>" + serialized_content

# Previewing the first few lines of the serialized content
print(final_serialized_content.splitlines()[:10])

print("finished")