<?php
use PHPUnit\Framework\TestCase;
require "unflatten.php";

class UnflattenFromArrayTest extends TestCase {

    public function testUnflattenFromArrayBasic() {
        $flattened = [["", "{}"], ["a", "{}"], ["a.b", 1], ["a.c", "[]"], ["a.c.0", 2], ["a.c.1", 3], ["d", "text"]];
        $result = unflattenFromArray($flattened);
        $this->assertEquals('{"a": {"b": 1, "c": [2, 3]}, "d": "text"}', json_encode($result));
    }
    
    public function testUnflattenFromArrayWithEmptyArray() {
        $flattened = [["", "[]"]];
        $result = unflattenFromArray($flattened);
        $this->assertEquals('[]', json_encode($result));
    }

    public function testUnflattenFromArrayWithNestedArrays() {
        $flattened = [["", "[]"], ["0", "[]"], ["0.0", "[]"], ["0.0.0", "x"]];
        $result = unflattenFromArray($flattened);
        $this->assertEquals('[[["x"]]]', json_encode($result));
    }
    
    public function testUnflattenFromArrayWithNestedObjects() {
        $flattened = [["", "{}"], ["a", "{}"], ["a.b", "{}"], ["a.b.c", "d"]];
        $result = unflattenFromArray($flattened);
        $this->assertEquals('{"a": {"b": {"c": "d"}}}', json_encode($result));
    }

    public function testUnflattenFromArrayWithMixed() {
        $flattened = [["", "{}"], ["a", "{}"], ["a.b", "[]"], ["a.b.0", "x"], ["a.b.1", "y"], ["a.b.2", "z"]];
        $result = unflattenFromArray($flattened);
        $this->assertEquals('{"a": {"b": ["x", "y", "z"]}}', json_encode($result));
    }
    
    public function testUnflattenFromArrayWithNull() {
        $flattened = [["", null]];
        $result = unflattenFromArray($flattened);
        $this->assertEquals('null', json_encode($result));
    }
}
?>
