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
    public function testFlattenToArrayWithDeeplyNestedObjects() {
        $json = '{"a": {"b": {"c": {"d": {"e": "f"}}}}}';
        $input = json_decode($json);
        $result = flattenToArray($input);
        $this->assertEquals([["", "{}"], ["a", "{}"], ["a.b", "{}"], ["a.b.c", "{}"], ["a.b.c.d", "{}"], ["a.b.c.d.e", "f"]], $result);
    }

    public function testFlattenToArrayWithDeeplyNestedArrays() {
        $json = '[[["x"]]]';
        $input = json_decode($json);
        $result = flattenToArray($input);
        $this->assertEquals([["", "[]"], ["0", "[]"], ["0.0", "[]"], ["0.0.0", "x"]], $result);
    }

    public function testFlattenToArrayWithMixedDeeplyNestedStructure() {
        $json = '{"a": {"b": [["x"], {"y": "z"}]}}';
        $input = json_decode($json);
        $result = flattenToArray($input);
        $this->assertEquals([["", "{}"], ["a", "{}"], ["a.b", "[]"], ["a.b.0", "[]"], ["a.b.0.0", "x"], ["a.b.1", "{}"], ["a.b.1.y", "z"]], $result);
    }

    public function testFlattenToArrayWithDeserializedEmptyObject() {
        $json = '{}';
        $input = json_decode($json);
        $result = flattenToArray($input);
        $this->assertEquals([["", "{}"]], $result);
    }

    public function testFlattenToArrayWithDeserializedEmptyArray() {
        $json = '[]';
        $input = json_decode($json);
        $result = flattenToArray($input);
        $this->assertEquals([["", "[]"]], $result);
    }

    public function testFlattenToArrayWithDeserializedFalse() {
        $json = 'false';
        $input = json_decode($json);
        $result = flattenToArray($input);
        $this->assertEquals([["", false]], $result);
    }

    public function testFlattenToArrayWithDeserializedTrue() {
        $json = 'true';
        $input = json_decode($json);
        $result = flattenToArray($input);
        $this->assertEquals([["", true]], $result);
    }

    public function testFlattenToArrayWithDeserializedNumber() {
        $json = '42';
        $input = json_decode($json);
        $result = flattenToArray($input);
        $this->assertEquals([["", 42]], $result);
    }}

?>
