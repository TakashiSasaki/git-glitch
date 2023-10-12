<?php
function flattenToArray($data, $path = "", $delimiter = ".", &$result = []) {
    if (is_object($data)) {
        $data = get_object_vars($data);
    }

    if (is_array($data) && count($data) === 0) {
        $result[] = [$path, '{}'];
        return;
    }

    if (is_array($data)) {
        $result[] = [$path, '{}'];
        foreach ($data as $key => $value) {
            flattenToArray($value, ($path === "" ? $key : $path . $delimiter . $key), $delimiter, $result);
        }
    } else {
        $result[] = [$path, $data];
    }
    return $result;
}
?>
