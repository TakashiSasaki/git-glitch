<?php
function flattenToArray($data, $prefix = '', $delimiter = '.') {
    $result = [];

    if ($prefix === '') {
        if (is_array($data)) {
            if (!empty($data) && array_keys($data) !== range(0, count($data) - 1)) {
                throw new InvalidArgumentException('Non-indexed array provided');
            }
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
            $key = is_int($key) ? (string)$key : $key;  // Ensure that numeric keys are treated as strings
            $new_key = ($prefix !== '') ? $prefix . $delimiter . $key : $key;
            if (is_array($value) || $value instanceof stdClass) {
                if (is_array($value)) {
                    if (!empty($value) && array_keys($value) !== range(0, count($value) - 1)) {
                        throw new InvalidArgumentException('Non-indexed array provided');
                    }
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
