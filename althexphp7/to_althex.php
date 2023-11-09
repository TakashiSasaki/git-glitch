<?php
require_once 'determine_case.php'; // is_upper_stdhex 関数を含む PHP ファイルを仮定

function to_althex($hex_string, $use_uppercase = null) {
    if ($use_uppercase === null) {
        $use_uppercase = is_upper_stdhex($hex_string);
    }
    
    // Determine the case of the output based on the input or the use_uppercase parameter
    $upper_map = 'GHJKMNPRSTUVWXYZ';
    $lower_map = 'ghjkmnprstuvwxyz';
    $std_hex = '0123456789ABCDEF';
    $custom_map = $use_uppercase ? $upper_map : $lower_map;
    
    $translated_string = '';
    // Translate each character of the hex string
    for ($i = 0; $i < strlen($hex_string); $i++) {
        $char = $hex_string[$i];
        $pos = stripos($std_hex, strtoupper($char)); // stripos is case-insensitive
        if ($pos !== false) {
            $translated_string .= $custom_map[$pos];
        } else {
            // If character is not in standard hex, keep it as it is (or handle the error as needed)
            $translated_string .= $char;
        }
    }
    
    return $translated_string;
}

?>
