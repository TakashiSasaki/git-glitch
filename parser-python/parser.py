import sys

def parse_netscape_bookmark_file(file_path):
    with open(file_path, 'r', encoding="utf-8") as file:
        content = file.readlines()

    def extract_folders(data, index=0):
        folders = []
        current_folder = []
        while index < len(data):
            line = data[index].strip()
            if line.startswith("<DT><H3"):
                folder_data, index = extract_folders(data, index + 1)
                current_folder.append({
                    "folder_start": line,
                    "content": folder_data
                })
            elif line == "</DL>":
                folders.append(current_folder)
                index += 2  # Skip the following <p>
                return folders, index
            elif line:
                current_folder.append(line)
            index += 1
        folders.append(current_folder)
        return folders

    header = "".join(content[:content.index("<DL><p>\n")]).strip()
    folders = extract_folders(content)[0]

    return header, folders

def serialize_folders(folders):
    result = ""
    for folder in folders:
        for item in folder:
            if isinstance(item, dict):
                result += item["folder_start"] + "\n"
                result += "<DL><p>\n"
                result += serialize_folders(item["content"])
                result += "</DL>\n<p>\n"
            else:
                result += item + "\n"
    return result

def serialize_to_netscape_format(header, folders):
    serialized_folders = serialize_folders(folders)
    return f"{header}\n<DL><p>\n{serialized_folders}</DL><p>"

if __name__ == "__main__":
    input_file_path = sys.argv[1]
    output_file_path = sys.argv[2]

    # Parsing the Netscape bookmark file
    parsed_header, parsed_folders = parse_netscape_bookmark_file(input_file_path)

    # Serializing the parsed structure
    final_serialized_content = serialize_to_netscape_format(parsed_header, parsed_folders)

    # Writing the serialized content to a file
    with open(output_file_path, 'w', encoding="utf-8") as file:
        file.write(final_serialized_content)
