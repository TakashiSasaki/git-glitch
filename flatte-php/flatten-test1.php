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
        $arr = ['x' => ['y' => ['z' => 1]]];
        $result = flattenToArray($arr);
        $this->assertEquals([['', '{}'], ['x', '{}'], ['x.y', '{}'], ['x.y.z', 1]], $result);
    }

    public function testFlattenToArrayWithObjectsUnderArrays() {
        $arr = ['a' => new stdClass()];
        $arr['a']->b = 1;
        $result = flattenToArray($arr);
        $this->assertEquals([['', '{}'], ['a', '{}'], ['a.b', 1]], $result);
    }

    public function testFlattenToArrayWithArraysUnderObjects() {
        $obj = new stdClass();
        $obj->a = ['b' => 1];
        $result = flattenToArray($obj);
        $this->assertEquals([['', '{}'], ['a', '{}'], ['a.b', 1]], $result);
    }

    public function testFlattenToArrayWithEmptyObject() {
        $obj = new stdClass();
        $result = flattenToArray($obj);
        $this->assertEquals([['', '{}']], $result);
    }

    public function testFlattenToArrayWithEmptyArray() {
        $arr = [];
        $result = flattenToArray($arr);
        $this->assertEquals([['', '{}']], $result);
    }
}
?>
