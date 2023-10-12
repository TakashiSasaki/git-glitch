<?php
function unflattenFromArray($flattenedArray) {
    // Assume the root is always the first element
    $rootValue = $flattenedArray[0][1];
    
    // Handle null at root level
    if (is_null($rootValue)) {
        return null;
    }

    $result = ($rootValue === '[]') ? [] : new stdClass();

    foreach ($flattenedArray as $item) {
        list($path, $value) = $item;

        // Skip the root
        if ($path === '') {
            continue;
        }

        $keys = explode('.', $path);
        $tmp = &$result;

        foreach ($keys as $key) {
            if (is_object($tmp)) {
                if (!property_exists($tmp, $key)) {
                    $tmp->$key = new stdClass();
                }
                $tmp = &$tmp->$key;
            } elseif (is_array($tmp)) {
                if (!isset($tmp[$key])) {
                    $tmp[$key] = [];
                }
                $tmp = &$tmp[$key];
            }
        }

        if ($value === '[]') {
            $value = [];
        } elseif ($value === '{}') {
            $value = new stdClass();
        }

        $tmp = $value;
    }

    return $result;
}



?>
