<?php
function unflattenFromArray($flattenedArray) {
    $result = new stdClass();
    
    foreach ($flattenedArray as $item) {
        list($path, $value) = $item;
        
        // Handle the root
        if ($path === "") {
            if ($value === "[]") {
                return [];
            } elseif ($value === "{}") {
                return new stdClass();
            } else {
                return $value;
            }
        }
        
        $keys = explode(".", $path);
        $lastKey = array_pop($keys);
        $tmp = &$result;
        
        foreach ($keys as $key) {
            if (!isset($tmp->$key)) {
                $tmp->$key = new stdClass();
            }
            $tmp = &$tmp->$key;
        }
        
        if ($value === "[]") {
            $tmp->$lastKey = [];
        } elseif ($value === "{}") {
            $tmp->$lastKey = new stdClass();
        } else {
            $tmp->$lastKey = $value;
        }
    }
    
    return $result;
}
?>
