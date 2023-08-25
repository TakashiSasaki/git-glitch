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
            current_folder['items'].append({'type': 'paragraph', 'content': line + '\n'})
        else:
            current_folder['items'].append({'type': 'other', 'content': line})

    return folder_structure
