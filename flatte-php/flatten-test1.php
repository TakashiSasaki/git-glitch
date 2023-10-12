<?php
use PHPUnit\Framework\TestCase;
require "flatten.php";

class FlattenToArrayTest extends TestCase {
    public function testFlattenToArraySimpleObject() {
        $input = ['a' => ['b' => ['c' => 'd']]];
        $result = flattenToArray($input);
        $this->assertEquals([
            ['', '{}'],
            ['a', '{}'],
            ['a.b', '{}'],
            ['a.b.c', 'd']
        ], $result);
    }

    public function testFlattenToArrayPrimitiveTypes() {
        $input = 42;
        $result = flattenToArray($input);
        $this->assertEquals([['', 42]], $result);

        $input = 'string';
        $result = flattenToArray($input);
        $this->assertEquals([['', 'string']], $result);

        $input = true;
        $result = flattenToArray($input);
        $this->assertEquals([['', true]], $result);

        $input = null;
        $result = flattenToArray($input);
        $this->assertEquals([['', null]], $result);
    }

    public function testFlattenToArrayNestingDepth4() {
        $input = ['a' => ['b' => ['c' => ['d' => ['e' => 1]]]]];
        $result = flattenToArray($input);
        $this->assertEquals([
            ['', '{}'],
            ['a', '{}'],
            ['a.b', '{}'],
            ['a.b.c', '{}'],
            ['a.b.c.d', '{}'],
            ['a.b.c.d.e', 1]
        ], $result);
    }
  
    public function testFlattenToArrayMultipleProperties() {
        $input = [
            'a' => 1, 
            'b' => 2, 
            'c' => [
                'd' => 3, 
                'e' => 4
            ]
        ];
        $result = flattenToArray($input);
        $this->assertEquals([
            ['', '{}'],
            ['a', 1],
            ['b', 2],
            ['c', '{}'],
            ['c.d', 3],
            ['c.e', 4]
        ], $result);
    }
  
    public function testFlattenToArrayMixedTypes() {
        $obj = new stdClass();
        $obj->d = 3;
        $obj->e = 4;

        $input = [
            'a' => 1, 
            'b' => 2, 
            'c' => $obj
        ];
        $result = flattenToArray($input);
        $this->assertEquals([
            ['', '{}'],
            ['a', 1],
            ['b', 2],
            ['c', '{}'],
            ['c.d', 3],
            ['c.e', 4]
        ], $result);
    } 
  
    public function testFlattenToArrayRootStdClass() {
        $obj = new stdClass();
        $obj->a = 1;
        $obj->b = 2;
        $obj->c = ['d' => 3, 'e' => 4];

        $result = flattenToArray($obj);
        $this->assertEquals([
            ['', '{}'],
            ['a', 1],
            ['b', 2],
            ['c', '{}'],
            ['c.d', 3],
            ['c.e', 4]
        ], $result);
    }
  
    public function testFlattenToArrayNested3Levels() {
        $obj = new stdClass();
        $obj->a = 1;
        $obj->b = new stdClass();  // Empty stdClass
        $obj->c = [
            'd' => [],  // Empty array
            'e' => ['f' => 2, 'g' => 3]
        ];

        $result = flattenToArray($obj);
        $this->assertEquals([
            ['', '{}'],
            ['a', 1],
            ['b', '{}'],
            ['c', '{}'],
            ['c.d', '{}'],
            ['c.e', '{}'],
            ['c.e.f', 2],
            ['c.e.g', 3]
        ], $result);
    }  
}
?>
