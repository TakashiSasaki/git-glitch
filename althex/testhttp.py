import httpimport

# althex モジュールがホストされている URL を指定します
with httpimport.remote_repo(['althex'], 'https://althex.glitch.me/'):
    # althex モジュールをインポートします
    from althex import __init__
