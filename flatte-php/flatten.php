<?php
function flatten($array, $prefix = '', $delimiter = '.') {
    $result = [];
    foreach($array as $key => $value) {
        $new_key = $prefix ? $prefix . $delimiter . $key : $key;
        if (is_array($value) || $value instanceof stdClass) {
            if ($value instanceof stdClass) {
                $value = (array) $value;
            }
            $result = array_merge($result, flatten($value, $new_key, $delimiter));
        } else {
            $result[$new_key] = $value;
        }
    }
    return $result;
}

// Test the function
$input_array = [
    'a' => 1,
    'b' => [
        'c' => 2,
        'd' => ['e' => 3]
    ]
];
$flattened_array = flatten($input_array);
print_r($flattened_array);

$input_object = new stdClass();
$input_object->a = 1;
$input_object->b = new stdClass();
$input_object->b->c = 2;
$input_object->b->d = new stdClass();
$input_object->b->d->e = 3;
$flattened_object = flatten($input_object, '', '/');
print_r($flattened_object);
?>
