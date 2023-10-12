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
    }
  
    public function testFlattenToArrayWithDepth2() {
        $json = '[[1, 2], [3, 4]]';
        $input = json_decode($json);
        $result = flattenToArray($input);
        $this->assertEquals([["", "[]"], ["0", "[]"], ["0.0", 1], ["0.1", 2], ["1", "[]"], ["1.0", 3], ["1.1", 4]], $result);
    }

    public function testFlattenToArrayWithDepth4() {
        $json = '[[[["a"], ["b"]], [["c"], ["d"]]], [[["e"], ["f"]], [["g"], ["h"]]]]';
        $input = json_decode($json);
        $result = flattenToArray($input);
        $expected = [
            ["", "[]"], ["0", "[]"], ["0.0", "[]"], ["0.0.0", "[]"], ["0.0.0.0", "a"], ["0.0.1", "[]"], ["0.0.1.0", "b"],
            ["0.1", "[]"], ["0.1.0", "[]"], ["0.1.0.0", "c"], ["0.1.1", "[]"], ["0.1.1.0", "d"],
            ["1", "[]"], ["1.0", "[]"], ["1.0.0", "[]"], ["1.0.0.0", "e"], ["1.0.1", "[]"], ["1.0.1.0", "f"],
            ["1.1", "[]"], ["1.1.0", "[]"], ["1.1.0.0", "g"], ["1.1.1", "[]"], ["1.1.1.0", "h"]
        ];
        $this->assertEquals($expected, $result);
    }

    public function testFlattenToArrayWithDepth5AndEmptyArrays() {
        $json = '[[[[[], []], [[], []]], [[[1], [2]], [[3], [4]]]], [[[[]]]]]';
        $input = json_decode($json);
        $result = flattenToArray($input);
        $expected = [
            ["", "[]"], ["0", "[]"], ["0.0", "[]"], ["0.0.0", "[]"], ["0.0.0.0", "[]"], ["0.0.0.1", "[]"],
            ["0.0.1", "[]"], ["0.0.1.0", "[]"], ["0.0.1.1", "[]"],
            ["0.1", "[]"], ["0.1.0", "[]"], ["0.1.0.0", "[]"], ["0.1.0.0.0", 1], ["0.1.0.1", "[]"], ["0.1.0.1.0", 2],
            ["0.1.1", "[]"], ["0.1.1.0", "[]"], ["0.1.1.0.0", 3], ["0.1.1.1", "[]"], ["0.1.1.1.0", 4],
            ["1", "[]"], ["1.0", "[]"], ["1.0.0", "[]"], ["1.0.0.0", "[]"]
        ];
        $this->assertEquals($expected, $result);
    }

    public function testFlattenToArrayWithLargeArray() {
        $json = '[' . str_repeat('"x",', 999) . '"x"]';
        $input = json_decode($json);
        $result = flattenToArray($input);
        $expected = [["", "[]"]];
        for ($i = 0; $i < 1000; ++$i) {
            $expected[] = [strval($i), "x"];
        }
        $this->assertEquals($expected, $result);
    }
  
    public function testFlattenToArrayWithDelimiterInProperty() {
        $json = '{"a.b": {"c": "d"}}';
        $input = json_decode($json);
        $this->expectException(InvalidArgumentException::class);
        $result = flattenToArray($input);
    }

    public function testFlattenToArrayWithDelimiterInNestedProperty() {
        $json = '{"a": {"b.c": "d"}}';
        $input = json_decode($json);
        $this->expectException(InvalidArgumentException::class);
        $result = flattenToArray($input);
    }

    public function testFlattenToArrayWithMultipleDelimitersInProperty() {
        $json = '{"a..b": {"c": "d"}}';
        $input = json_decode($json);
        $this->expectException(InvalidArgumentException::class);
        $result = flattenToArray($input);
    }

    public function testFlattenToArrayWithNoDelimiterInProperty() {
        $json = '{"a": {"b": "c"}}';
        $input = json_decode($json);
        $result = flattenToArray($input);
        $this->assertEquals([["", "{}"], ["a", "{}"], ["a.b", "c"]], $result);
    }

}
?>
