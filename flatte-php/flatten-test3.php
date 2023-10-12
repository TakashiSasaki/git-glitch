<?php
use PHPUnit\Framework\TestCase;
require "flatten.php";

class FlattenToArrayTest extends TestCase {

    public function testFlattenToArrayWithDeserializedObject() {
        $json = '{"a": {"b": {"c": "d"}}}';
        $input = json_decode($json);
        $result = flattenToArray($input);
        $this->assertEquals(json_encode([["", "{}"], ["a", "{}"], ["a.b", "{}"], ["a.b.c", "d"]]), json_encode($result));
    }

    public function testFlattenToArrayWithDeserializedArray() {
        $json = '["x", "y", "z"]';
        $input = json_decode($json);
        $result = flattenToArray($input);
        $this->assertEquals(json_encode([["", "[]"], ["0", "x"], ["1", "y"], ["2", "z"]]), json_encode($result));
    }

    public function testFlattenToArrayWithDeserializedMixed() {
        $json = '{"a": {"b": ["x", "y", "z"]}}';
        $input = json_decode($json);
        $result = flattenToArray($input);
        $this->assertEquals(json_encode([["", "{}"], ["a", "{}"], ["a.b", "[]"], ["a.b.0", "x"], ["a.b.1", "y"], ["a.b.2", "z"]]), json_encode($result));
    }

    public function testFlattenToArrayWithDeserializedNull() {
        $json = 'null';
        $input = json_decode($json);
        $result = flattenToArray($input);
        $this->assertEquals(json_encode([["", null]]), json_encode($result));
    }

    public function testFlattenToArrayWithDeeplyNestedArrays() {
        $json = '[[["x"]]]';
        $input = json_decode($json);
        $result = flattenToArray($input);
        $this->assertEquals(json_encode([["", "[]"], ["0", "[]"], ["0.0", "[]"], ["0.0.0", "x"]]), json_encode($result));
    }
  
    public function testFlattenToArrayWithDeserializedEmptyObject() {
        $json = '{}';
        $input = json_decode($json);
        $result = flattenToArray($input);
        $this->assertEquals(json_encode([["", "{}"]]), json_encode($result));
    }

    public function testFlattenToArrayWithDeserializedObjectWithDelimiterInKey() {
        $json = '{"a.b": 1}';
        $this->expectException(Exception::class);
        $input = json_decode($json);
        $result = flattenToArray($input);
    }

    public function testFlattenToArrayWithDeserializedObjectWithNestedDelimiterInKey() {
        $json = '{"a": {"b.c": 1}}';
        $this->expectException(Exception::class);
        $input = json_decode($json);
        $result = flattenToArray($input);
    }

    public function testFlattenToArrayWithDeserializedDeeplyNestedObject() {
        $json = '{"a": {"b": {"c": {"d": {"e": 1}}}}}';
        $input = json_decode($json);
        $result = flattenToArray($input);
        $this->assertEquals(json_encode([["", "{}"], ["a", "{}"], ["a.b", "{}"], ["a.b.c", "{}"], ["a.b.c.d", "{}"], ["a.b.c.d.e", 1]]), json_encode($result));
    }

    public function testFlattenToArrayWithDeserializedLargeArray() {
        $json = '["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]';
        $input = json_decode($json);
        $result = flattenToArray($input);
        $this->assertEquals(json_encode([["", "[]"], ["0", "a"], ["1", "b"], ["2", "c"], ["3", "d"], ["4", "e"], ["5", "f"], ["6", "g"], ["7", "h"], ["8", "i"], ["9", "j"]]), json_encode($result));
    }
  
}
?>
