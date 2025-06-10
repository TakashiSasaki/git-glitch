<?php
function unflattenFromArray($flattened, $delimiter = '.') {
    $result = null;

    foreach ($flattened as $pair) {
        $keys = $pair[0] === "" ? [] : explode($delimiter, $pair[0]);
        $value = $pair[1];
        
        $temp = &$result;

        foreach ($keys as $key) {
            if (!is_object($temp) && !is_array($temp)) {
                $temp = new stdClass();
            }

            if (is_array($temp)) {
                if (!isset($temp[$key])) {
                    $temp[$key] = null;
                }
                $temp = &$temp[$key];
            } else {
                if (!isset($temp->$key)) {
                    $temp->$key = null;
                }
                $temp = &$temp->$key;
            }
        }

        if (is_string($value) && ($value === "{}" || $value === "[]")) {
            $temp = $value === "{}" ? new stdClass() : [];
        } else {
            $temp = $value;
        }
    }

    return $result;
}
?>
