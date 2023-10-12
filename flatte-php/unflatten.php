<?php
function unflattenFromArray($flattened, $delimiter = '.') {
    $result = new stdClass();
    $root_primitive_value = null;

    foreach ($flattened as $pair) {
        $keys = explode($delimiter, $pair[0]);
        $value = $pair[1];
        
        // Handle root primitive value
        if ($pair[0] === "") {
            $root_primitive_value = $value;
            continue;
        }

        $temp = &$result;

        foreach ($keys as $key) {
            if (!isset($temp->$key)) {
                $temp->$key = new stdClass();
            }
            $last_key = $key;
            $temp = &$temp->$key;
        }

        if (is_string($value) && ($value === "{}" || $value === "[]")) {
            $temp = $value === "{}" ? new stdClass() : [];
        } else {
            $temp = $value;
        }
    }

    // If a root primitive value is set, return it instead of the result object
    if ($root_primitive_value !== null) {
        return $root_primitive_value;
    }

    return $result;
}
?>
