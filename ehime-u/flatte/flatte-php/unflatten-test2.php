<?php
use PHPUnit\Framework\TestCase;
require "unflatten.php";

final class UnflattenFromArrayTest extends TestCase {
    public function testUnflattenFromArrayRootString() {
        $flattened = [["", "abc"]];
        $result = unflattenFromArray($flattened);
        $this->assertEquals('"abc"', json_encode($result));
    }
    
    public function testUnflattenFromArrayRootInteger() {
        $flattened = [["", 42]];
        $result = unflattenFromArray($flattened);
        $this->assertEquals('42', json_encode($result));
    }
    
    public function testUnflattenFromArrayRootFloat() {
        $flattened = [["", 3.14]];
        $result = unflattenFromArray($flattened);
        $this->assertEquals('3.14', json_encode($result));
    }

    public function testUnflattenFromArrayRootBooleanTrue() {
        $flattened = [["", true]];
        $result = unflattenFromArray($flattened);
        $this->assertEquals('true', json_encode($result));
    }

    public function testUnflattenFromArrayRootBooleanFalse() {
        $flattened = [["", false]];
        $result = unflattenFromArray($flattened);
        $this->assertEquals('false', json_encode($result));
    }

    public function testUnflattenFromArrayRootEmptyArray() {
        $flattened = [["", "[]"]];
        $result = unflattenFromArray($flattened);
        $this->assertEquals('[]', json_encode($result));
    }

    public function testUnflattenFromArrayRootEmptyObject() {
        $flattened = [["", "{}"]];
        $result = unflattenFromArray($flattened);
        $this->assertEquals('{}', json_encode($result));
    }
}
?>
