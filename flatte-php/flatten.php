<?php
function flatten($array, $prefix = '', $delimiter = '.') {
    $result = [];
    foreach($array as $key => $value) {
        $new_key = $prefix ? $prefix . $delimiter . $key : $key;
        if (is_array($value) || $value instanceof stdClass) {
            if ($value instanceof stdClass) {
                $value = (array) $value;
            }
            $result = array_merge($result, flatten($value, $new_key, $delimiter));
        } else {
            $result[$new_key] = $value;
        }
    }
    return $result;
}
?>
