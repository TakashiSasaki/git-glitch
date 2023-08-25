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
