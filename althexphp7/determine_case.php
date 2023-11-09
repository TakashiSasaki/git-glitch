<?php
$althex_chars = str_split('GHJKLMNOPQRSTUVWXYZghjklmnopqrstuvwxyz');
$stdhex_chars = str_split('ABCDEFabcdef');

function is_upper_althex($s) {
    global $althex_chars;
    $filtered_chars = array_unique(array_filter(str_split($s), function($char) use ($althex_chars) {
        return in_array($char, $althex_chars);
    }));
    return !empty($filtered_chars) && ctype_upper(implode('', $filtered_chars));
}

function is_lower_althex($s) {
    global $althex_chars;
    $filtered_chars = array_unique(array_filter(str_split($s), function($char) use ($althex_chars) {
        return in_array($char, $althex_chars);
    }));
    return !empty($filtered_chars) && ctype_lower(implode('', $filtered_chars));
}

function is_upper_stdhex($s) {
    global $stdhex_chars;
    $filtered_chars = array_unique(array_filter(str_split($s), function($char) use ($stdhex_chars) {
        return in_array($char, $stdhex_chars);
    }));
    return !empty($filtered_chars) && ctype_upper(implode('', $filtered_chars));
}

function is_lower_stdhex($s) {
    global $stdhex_chars;
    $filtered_chars = array_unique(array_filter(str_split($s), function($char) use ($stdhex_chars) {
        return in_array($char, $stdhex_chars);
    }));
    return !empty($filtered_chars) && ctype_lower(implode('', $filtered_chars));
}
?>
