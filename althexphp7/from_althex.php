<?php
require_once 'determine_case.php'; // Assuming this contains is_upper_althex function

function from_althex($althex_string, $use_uppercase = null) {
    // Determine the case from the input string if use_uppercase is not set
    if ($use_uppercase === null) {
        $use_uppercase = is_upper_althex($althex_string);
    }

    // Create the translation maps
    $upper_map = array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F');
    $lower_map = array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f');
    $custom_map_upper = array('G', 'H', 'J', 'K', 'M', 'N', 'P', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
    $custom_map_lower = array('g', 'h', 'j', 'k', 'm', 'n', 'p', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z');
    
    // Create an associative array for translation
    $custom_to_hex_map = [];
    for ($i = 0; $i < count($upper_map); $i++) {
        $custom_to_hex_map[$custom_map_upper[$i]] = $upper_map[$i];
        $custom_to_hex_map[$custom_map_lower[$i]] = $lower_map[$i];
    }

    // Translate the custom hex string back to standard hex
    $result = '';
    for ($i = 0; $i < strlen($althex_string); $i++) {
        $char = $althex_string[$i];
        if (isset($custom_to_hex_map[$char])) {
            $result .= $use_uppercase ? strtoupper($custom_to_hex_map[$char]) : strtolower($custom_to_hex_map[$char]);
        } else {
            $result .= $char;
        }
    }

    return $result;
}
?>
