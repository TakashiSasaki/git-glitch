<?php
use PHPUnit\Framework\TestCase;
require 'determine_case.php'; // Assume this is the name of your PHP file containing the functions

class DetermineCaseTest extends TestCase {

    public function testIsUpperAlthex() {
        $this->assertTrue(is_upper_althex("HUKZ"));
        $this->assertTrue(is_upper_althex('GHJKMNPRSTUVWXYZ'));
        $this->assertFalse(is_upper_althex('ghjkmnprstuvwxyz'));
        $this->assertFalse(is_upper_althex('0123456789'));
        $this->assertFalse(is_upper_althex(''));
        $this->assertFalse(is_upper_althex('abcABC'));
    }

    public function testIsLowerAlthex() {
        $this->assertTrue(is_lower_althex('ghjkmnprstuvwxyz'));
        $this->assertFalse(is_lower_althex('GHJKMNPRSTUVWXYZ'));
        $this->assertFalse(is_lower_althex('0123456789'));
        $this->assertFalse(is_lower_althex(''));
        $this->assertFalse(is_lower_althex('abcABC'));
    }

    public function testIsUpperStdhex() {
        $this->assertTrue(is_upper_stdhex('ABCDEF'));
        $this->assertFalse(is_upper_stdhex('abcdef'));
        $this->assertFalse(is_upper_stdhex('0123456789'));
        $this->assertFalse(is_upper_stdhex(''));
        $this->assertFalse(is_upper_stdhex('ghjkmnprstuvwxyz'));
    }

    public function testIsLowerStdhex() {
        $this->assertTrue(is_lower_stdhex('abcdef'));
        $this->assertFalse(is_lower_stdhex('ABCDEF'));
        $this->assertFalse(is_lower_stdhex('0123456789'));
        $this->assertFalse(is_lower_stdhex(''));
        $this->assertFalse(is_lower_stdhex('GHJKMNPRSTUVWXYZ'));
    }

    /**
     * @expectedException TypeError
     */
    public function testExceptionIsUpperAlthex() {
        is_upper_althex(123);
    }

    /**
     * @expectedException TypeError
     */
    public function testExceptionIsLowerAlthex() {
        is_lower_althex(123);
    }

    /**
     * @expectedException TypeError
     */
    public function testExceptionIsUpperStdhex() {
        is_upper_stdhex(123);
    }

    /**
     * @expectedException TypeError
     */
    public function testExceptionIsLowerStdhex() {
        is_lower_stdhex(123);
    }

}

?>
