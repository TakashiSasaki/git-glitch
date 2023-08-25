def extract_folders(data, index=0, level=0):
    folders = []
    current_folder = []
    while index < len(data):
        line = data[index]
        if line.startswith("<DT><H3"):
            folder_data, index = extract_folders(data, index + 1, level + 1)
            current_folder.append({
                "folder_start": line,
                "content": folder_data,
                "level": level
            })
        elif line.strip() == "</DL>":
            folders.append(current_folder)
            index += 1  # Skip the following <p>
            return folders, index
        else:
            current_folder.append(line.rstrip())
        index += 1
    folders.append(current_folder)
    return folders

def serialize_folders(folders):
    result = ""
    for folder in folders:
        for item in folder:
            if isinstance(item, dict):
                result += item["folder_start"]
                if item["level"] == 0:
                    result += "<DL>\n<p>\n"
                else:
                    result += "<DL><p>\n"
                result += serialize_folders(item["content"])
                result += "</DL>\n<p>\n"
            else:
                result += item + "\n"
    return result

parsed_header, parsed_folders = parse_netscape_bookmark_file(input_file_path)
final_serialized_content = serialize_to_netscape_format(parsed_header, parsed_folders)

output_file_path_v4 = "/mnt/data/serialized_netscape_bookmarks_v4.html"
with open(output_file_path_v4, 'w', encoding="utf-8") as file:
    file.write(final_serialized_content)

output_file_path_v4
