<?php
require_once 'determine_case.php'; // is_upper_stdhex 関数を含む PHP ファイルを仮定

/**
 * Converts a standard hexadecimal string to an alternative hexadecimal representation.
 *
 * The alternative hexadecimal representation uses 'G' to 'Z' (excluding 'I', 'L', 'O', 'Q') instead of 'A' to 'F'.
 * If the `$use_uppercase` parameter is not set, the case of the output string will be determined by the case of the input string.
 * If `$use_uppercase` is explicitly set to true or false, the output will be in upper or lower case respectively.
 *
 * Usage:
 *   - To convert a standard hex string to alternative hex: `to_althex('A1BC')`.
 *   - To convert and ensure the output is in uppercase: `to_althex('a1bc', true)`.
 *   - To convert and ensure the output is in lowercase: `to_althex('A1BC', false)`.
 *
 * @param string $hex_string The standard hexadecimal string to convert.
 * @param bool|null $use_uppercase Optional. Whether to output the alternative hexadecimal string in uppercase. If null, the case is inferred from the input string.
 * @return string The alternative hexadecimal representation of the input string.
 *
 * Examples:
 *   - `to_althex('A1BC')` will return 'G1HJ' assuming the input string is in uppercase.
 *   - `to_althex('a1bc', true)` will return 'G1HJ'.
 *   - `to_althex('A1BC', false)` will return 'g1hj'.
 */
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
