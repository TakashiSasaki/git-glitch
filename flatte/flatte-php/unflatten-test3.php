<?php
use PHPUnit\Framework\TestCase;
require "unflatten.php";

class UnflattenFromArrayDeepNestedTest extends TestCase {
    public function testUnflattenFromArrayDeeplyNestedObjects() {
        $flattened = [
            ["", "{}"],
            ["a", "{}"],
            ["a.b", "{}"],
            ["a.b.c", "{}"],
            ["a.b.c.d", 1],
            ["e", "{}"],
            ["e.f", "{}"],
            ["e.f.g", "deep"]
        ];
        $result = unflattenFromArray($flattened);
        $this->assertEquals('{"a":{"b":{"c":{"d":1}}},"e":{"f":{"g":"deep"}}}', json_encode($result));
    }

    public function testUnflattenFromArrayDeeplyNestedArrays() {
        $flattened = [
            ["", "[]"],
            ["0", "[]"],
            ["0.0", "[]"],
            ["0.0.0", 1],
            ["1", "[]"],
            ["1.0", "deep"]
        ];
        $result = unflattenFromArray($flattened);
        $this->assertEquals('[[[1]],["deep"]]', json_encode($result));
    }

    public function testUnflattenFromArrayMixedDeeplyNested() {
        $flattened = [
            ["", "{}"],
            ["a", "{}"],
            ["a.b", "[]"],
            ["a.b.0", "{}"],
            ["a.b.0.c", 1],
            ["a.b.0.d", 2],
            ["a.b.1", 3],
            ["e", "{}"],
            ["e.f", "{}"],
            ["e.f.g", "[]"],
            ["e.f.g.0", "deep"],
            ["e.f.g.1", "{}"],
            ["e.f.g.1.h", "deeper"]
        ];
        $result = unflattenFromArray($flattened);
        $this->assertEquals('{"a":{"b":[{"c":1,"d":2},3]},"e":{"f":{"g":["deep",{"h":"deeper"}]}}}', json_encode($result));
    }

    public function testUnflattenFromArrayWithEmptyObjectsAndArrays() {
        $flattened = [
            ["", "{}"],
            ["a", "{}"],
            ["b", "[]"],
            ["c", "{}"],
            ["c.d", "{}"],
            ["c.d.e", "[]"]
        ];
        $result = unflattenFromArray($flattened);
        $this->assertEquals('{"a":{},"b":[],"c":{"d":{"e":[]}}}', json_encode($result));
    }
}
?>