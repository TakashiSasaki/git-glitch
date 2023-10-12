<?php
function flattenToArray($data, $prefix = '', $delimiter = '.') {
    $result = [];

    if ($prefix === '') {
        $result[] = [$prefix, is_array($data) || $data instanceof stdClass ? '{}' : $data];
    }

    if (is_array($data) || $data instanceof stdClass) {
        if ($data instanceof stdClass) {
            $data = (array)$data;
        }
        foreach ($data as $key => $value) {
            $new_key = $prefix ? $prefix . $delimiter . $key : $key;
            if (is_array($value) || $value instanceof stdClass) {
                $result[] = [$new_key, '{}'];
                $result = array_merge($result, flattenToArray($value, $new_key, $delimiter));
            } else {
                $result[] = [$new_key, $value];
            }
        }
    }

    return $result;
}

?>
