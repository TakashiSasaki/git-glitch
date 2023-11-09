<?php
use PHPUnit\Framework\TestCase;

require_once 'to_althex.php';
require_once 'from_althex.php';

class TestRoundtrip extends TestCase {
    // Test from_althex with lowercase expected output
    public function testFromAlthexLowercase() {
        $this->assertEquals(from_althex("hukz"), "1a3f");
        $this->assertEquals(from_althex("ggzz"), "00ff");
    }

    // Test from_althex with uppercase expected output
    public function testFromAlthexUppercase() {
        $this->assertEquals(from_althex("HUKZ"), "1A3F");
        $this->assertEquals(from_althex("GGZZ"), "00FF");
    }

    // Test the roundtrip conversion
    public function testRoundTrip() {
        $hex_values = ["1A3F", "00FF", "ABCD", "1234", "FACE"];
        foreach ($hex_values as $hex_value) {
            $custom_value = to_althex($hex_value);
            $round_trip_value = from_althex($custom_value);
            $this->assertEquals($round_trip_value, $hex_value);
        }
    }

    // Test the roundtrip conversion for a UUID
    public function testUuidRoundTrip() {
        // Generate a UUID
        $original_uuid = strtoupper(uuid_create(UUID_TYPE_RANDOM));
        // Convert UUID to custom hex representation
        $custom_uuid = to_althex($original_uuid);
        // Convert back to original UUID
        $result_uuid = from_althex($custom_uuid);
        // Verify that the original and the result are the same
        $this->assertEquals($original_uuid, $result_uuid);
    }

    // Test the roundtrip conversion for a long random hex string
    public function testLongStringRoundTrip() {
        // Generate a long string of random hexadecimal characters
        $long_hex_string = '';
        for ($i = 0; $i < 10000; $i++) {
            $long_hex_string .= dechex(mt_rand(0, 15));
        }
        $long_hex_string = strtoupper($long_hex_string);
        $custom_string = to_althex($long_hex_string);
        $round_trip_result = from_althex($custom_string);
        $this->assertEquals($long_hex_string, $round_trip_result);
    }
}
?>
