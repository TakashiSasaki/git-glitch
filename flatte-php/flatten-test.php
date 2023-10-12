<?php
use PHPUnit\Framework\TestCase;

class FlattenTest extends TestCase {
    public function testFlattenSimpleArray() {
        $input = ['a' => 1, 'b' => 2];
        $result = flatten($input);
        $this->assertEquals(['a' => 1, 'b' => 2], $result);
    }

    public function testFlattenNestedArray() {
        $input = ['a' => 1, 'b' => ['c' => 2]];
        $result = flatten($input);
        $this->assertEquals(['a' => 1, 'b.c' => 2], $result);
    }

    public function testFlattenNestedArrayWithDifferentDelimiter() {
        $input = ['a' => 1, 'b' => ['c' => 2]];
        $result = flatten($input, '', '/');
        $this->assertEquals(['a' => 1, 'b/c' => 2], $result);
    }

    public function testFlattenStdClassObject() {
        $input = new stdClass();
        $input->a = 1;
        $input->b = new stdClass();
        $input->b->c = 2;
        $result = flatten($input);
        $this->assertEquals(['a' => 1, 'b.c' => 2], $result);
    }

    public function testFlattenMixedNumericAndStringKeys() {
        $input = ['a' => 1, 'b' => [0 => 'c']];
        $result = flatten($input);
        $this->assertEquals(['a' => 1, 'b.0' => 'c'], $result);
    }

    public function testFlattenDeeplyNestedStructure() {
        $input = ['a' => ['b' => ['c' => ['d' => 1]]]];
        $result = flatten($input);
        $this->assertEquals(['a.b.c.d' => 1], $result);
    }

    public function testFlattenEmptyArrayAndObject() {
        $input = ['a' => [], 'b' => new stdClass()];
        $result = flatten($input);
        $this->assertEquals(['a' => [], 'b' => []], $result);
    }
}
?>
