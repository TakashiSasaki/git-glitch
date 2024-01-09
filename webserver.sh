#!/bin/bash

# ドキュメントルートの設定
root="/app"

# 無限ループで接続を待ち受ける
while true; do
  # ncを使ってHTTPリクエストを受け取る
  { 
    read request
    echo -e 'HTTP/1.1 200 OK\r\n'
    path=$(echo $request | cut -d ' ' -f 2)
    file="$root$path"

    # ファイルが存在し、通常のファイルであるか確認
    if [[ -f $file ]]; then
      cat $file
    else
      echo "File not found"
    fi
  } | nc -l -p 8080 -q 1
done
