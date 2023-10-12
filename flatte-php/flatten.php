<?php
function flatten($data, $prefix = '', $delimiter = '.') {
    if (!is_array($data) && !is_object($data)) {
        return [$prefix => $data];
    }
  
    $result = [];
    foreach ($data as $key => $value) {
        $new_key = $prefix ? $prefix . $delimiter . $key : $key;
        if (is_array($value) || is_object($value)) {
            if (empty((array)$value)) {
                $result[$new_key] = [];
            } else {
                $result += flatten((array)$value, $new_key, $delimiter);
            }
        } else {
            $result[$new_key] = $value;
        }
    }
    return $result;
}

?>
