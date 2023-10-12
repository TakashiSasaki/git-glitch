<?php
use PHPUnit\Framework\TestCase;
require 'flatten.php';

class FlattenTest extends TestCase {
    // ... (Previous test cases)

    public function testFlattenMixedArrayAndStdClass() {
        $input = ['a' => 1, 'b' => new stdClass()];
        $input['b']->c = 2;
        $result = flatten($input);
        $this->assertEquals(['a' => 1, 'b.c' => 2], $result);
    }

    public function testFlattenDeeplyNestedMixedArrayAndStdClass() {
        $input = ['a' => ['b' => new stdClass()]];
        $input['a']['b']->c = ['d' => 1];
        $result = flatten($input);
        $this->assertEquals(['a.b.c.d' => 1], $result);
    }

    public function testFlattenStdClassInsideArray() {
        $input = ['a' => new stdClass()];
        $input['a']->b = [1, 2];
        $result = flatten($input);
        $this->assertEquals(['a.b.0' => 1, 'a.b.1' => 2], $result);
    }
  
    public function testFlattenNestingDepth4() {
        $input = ['a' => ['b' => ['c' => ['d' => ['e' => 1]]]]];
        $result = flatten($input);
        $this->assertEquals(['a.b.c.d.e' => 1], $result);
    }
}
?>
