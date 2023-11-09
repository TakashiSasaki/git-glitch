<?php
require_once 'determine_case.php'; // is_upper_stdhex 関数を含む PHP ファイルを仮定

function to_althex($hex_string, $use_uppercase = null) {
    if ($use_uppercase === null) {
        $use_uppercase = is_upper_stdhex($hex_string);
    }

    $upper_map = 'GHJKMNPRSTUVWXYZ';
    $lower_map = 'ghjkmnprstuvwxyz';
    $custom_map = $use_uppercase ? $upper_map : $lower_map;

    $result = '';
    for ($i = 0; $i < strlen($hex_string); $i++) {
        $char = $hex_string[$i];
        if (is_numeric($char)) {
            $index = intval($char) + 6;
            if ($index < strlen($custom_map)) {
                $result .= $custom_map[$index];
            } else {
                // エラーハンドリング: インデックスが範囲外です
            }
        } else {
            $offset = ctype_upper($char) ? ord('A') : ord('a');
            $index = ord(strtolower($char)) - $offset + 16;
            if ($index < strlen($custom_map)) {
                $result .= $custom_map[$index];
            } else {
                // エラーハンドリング: インデックスが範囲外です
            }
        }
    }

    return $result;
}

?>
