<?php
function flattenToArray($data, $prefix = '', $delimiter = '.') {
    $result = [];

    if ($prefix === '') {
        if (is_array($data)) {
            $result[] = [$prefix, '[]'];
        } elseif ($data instanceof stdClass) {
            $result[] = [$prefix, '{}'];
        } else {
            $result[] = [$prefix, $data];
        }
    }

    if (is_array($data) || $data instanceof stdClass) {
        if ($data instanceof stdClass) {
            $data = (array)$data;
        }
        foreach ($data as $key => $value) {
            $new_key = $prefix ? $prefix . $delimiter . $key : $key;
            if (is_array($value) || $value instanceof stdClass) {
                if (is_array($value)) {
                    $result[] = [$new_key, '[]'];
                } else {
                    $result[] = [$new_key, '{}'];
                }
                $result = array_merge($result, flattenToArray($value, $new_key, $delimiter));
            } else {
                $result[] = [$new_key, $value];
            }
        }
    }

    return $result;
}
?>
