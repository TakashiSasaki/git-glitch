<?php
use PHPUnit\Framework\TestCase;
require 'flatten.php';

class FlattenToArrayJSONDeserializationTest extends PHPUnit\Framework\TestCase {
    public function testFlattenToArrayWithDeserializedObject() {
        $json = '{"a": {"b": {"c": "d"}}}';
        $input = json_decode($json);
        $result = flattenToArray($input);
        $this->assertEquals([["", "{}"], ["a", "{}"], ["a.b", "{}"], ["a.b.c", "d"]], $result);
    }

    public function testFlattenToArrayWithDeserializedArray() {
        $json = '["x", "y", "z"]';
        $input = json_decode($json);
        $result = flattenToArray($input);
        $this->assertEquals([["", "[]"], ["0", "x"], ["1", "y"], ["2", "z"]], $result);
    }

    public function testFlattenToArrayWithDeserializedMixed() {
        $json = '{"a": {"b": ["x", "y", "z"]}}';
        $input = json_decode($json);
        $result = flattenToArray($input);
        $this->assertEquals([["", "{}"], ["a", "{}"], ["a.b", "[]"], ["a.b.0", "x"], ["a.b.1", "y"], ["a.b.2", "z"]], $result);
    }

    public function testFlattenToArrayWithDeserializedNull() {
        $json = 'null';
        $input = json_decode($json);
        $result = flattenToArray($input);
        $this->assertEquals([["", null]], $result);
    }
}

?>
