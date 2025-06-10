### NAME

**netscape_bookmark_parser** - HTML ブックマークファイルの解析とシリアライズ

### SYNOPSIS

```bash
python netscape_bookmark_parser.py [input_file_path] [output_file_path] [json_file_path]
```

### DESCRIPTION

**netscape_bookmark_parser** は Netscape 形式（拡張子 html）の
ブックマークファイルを解析し、
JSON 形式での出力と HTML 形式での再シリアライズを行います。
このスクリプトはブックマークファイルの構造を保持し、
解析結果を JSON 形式で保存するために使用されます。

### OPTIONS

- `[input_file_path]`  
  入力となる HTML ブックマークファイルのパス。

- `[output_file_path]`  
  シリアライズされた HTML 内容の出力先ファイルのパス。

- `[json_file_path]`  
  解析結果を JSON 形式で保存するファイルのパス。

### EXAMPLES

以下のコマンドは、`input.html` からデータを読み取り、
解析結果を`output.html` にシリアライズし、
解析結果を`items.json` に JSON 形式で保存します。

```bash
python bookmark_parser.py input.html output.html items.json
```

### FILES

- `input.html`  
  読み取りたい HTML ブックマークファイル。
- `output.html`  
  シリアライズされた HTML ブックマークファイルの出力先。
- `items.json`  
  解析結果を保存する JSON ファイル。

### SEE ALSO

- JSON (JavaScript Object Notation): データ交換フォーマット。

### AUTHOR

Takashi SASAKI 佐々木隆志

### REPORTING BUGS

バグ報告や機能リクエストは
[@TakashiSasaki](https://twitter.com/TakashiSasaki)
へお願いします。
