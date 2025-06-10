<?php
use PHPUnit\Framework\TestCase;
require "flatten.php";

class FlattenToArrayTest extends TestCase {
    public function testFlattenToArrayWithNestedObjects() {
        $obj = new stdClass();
        $obj->a = new stdClass();
        $obj->a->b = 1;
        $result = flattenToArray($obj);
        $this->assertEquals([['', '{}'], ['a', '{}'], ['a.b', 1]], $result);
    }

    public function testFlattenToArrayWithNestedArrays() {
        $this->expectException(Exception::class);
        $arr = ['x' => ['y' => ['z' => 1]]];
        $result = flattenToArray($arr);
    }

    public function testFlattenToArrayWithObjectsUnderArrays() {
        $this->expectException(Exception::class);
        $arr = ['a' => new stdClass()];
        $arr['a']->b = 1;
        $result = flattenToArray($arr);
    }
  
    public function testFlattenToArrayWithArraysUnderObjects() {
        $this->expectException(Exception::class);
        $obj = new stdClass();
        $obj->a = ['b' => 1];
        $result = flattenToArray($obj);
    }


    public function testFlattenToArrayWithEmptyObject() {
        $obj = new stdClass();
        $result = flattenToArray($obj);
        $this->assertEquals([['', '{}']], $result, "The test failed for empty stdClass object. The output should be an array with a single element indicating the root is an empty object.");
    }

    public function testFlattenToArrayWithEmptyArray() {
        $arr = [];
        $result = flattenToArray($arr);
        $this->assertEquals([['', '[]']], $result);
    }

    public function testFlattenToArrayWithString() {
        $input = "string";
        $result = flattenToArray($input);
        $this->assertEquals([["", "string"]], $result);
    }

    public function testFlattenToArrayWithBoolean() {
        $input = true;
        $result = flattenToArray($input);
        $this->assertEquals([["", true]], $result);
    }

    public function testFlattenToArrayWithInteger() {
        $input = 42;
        $result = flattenToArray($input);
        $this->assertEquals([["", 42]], $result);
    }

    public function testFlattenToArrayWithFloat() {
        $input = 3.14;
        $result = flattenToArray($input);
        $this->assertEquals([["", 3.14]], $result);
    }

    public function testFlattenToArrayWithNull() {
        $input = null;
        $result = flattenToArray($input);
        $this->assertEquals([["", null]], $result);
    }

}
?>
