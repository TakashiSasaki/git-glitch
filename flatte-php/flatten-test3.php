<?php
use PHPUnit\Framework\TestCase;
require "flatten.php";

class FlattenTest extends TestCase {
    // ... (Previous test cases)

    public function testFlattenPrimitiveTypes() {
        $input = 42;
        $result = flatten($input);
        $this->assertEquals(['' => 42], $result);

        $input = 'string';
        $result = flatten($input);
        $this->assertEquals(['' => 'string'], $result);

        $input = true;
        $result = flatten($input);
        $this->assertEquals(['' => true], $result);

        $input = null;
        $result = flatten($input);
        $this->assertEquals(['' => null], $result);
    }
}
?>
