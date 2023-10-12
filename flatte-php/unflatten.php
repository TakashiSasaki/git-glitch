<?php
function unflattenFromArray($flattened) {
    $result = null;

    foreach ($flattened as $item) {
        list($key, $value) = $item;
        $keys = explode(".", $key);

        $ref = &$result;
        foreach ($keys as $k) {
            if (is_null($ref)) {
                $ref = [];
            }

            if (isset($ref[$k])) {
                $ref = &$ref[$k];
            } else {
                $ref[$k] = null;
                $ref = &$ref[$k];
            }
        }

        if ($value === "[]") {
            $ref = [];
        } elseif ($value === "{}") {
            $ref = new stdClass();
        } else {
            $ref = $value;
        }
    }

    return $result;
}
?>
