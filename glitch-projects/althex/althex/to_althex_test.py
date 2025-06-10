from to_althex import to_althex
import unittest

class TestToAltHex(unittest.TestCase):
    # to_althex tests
    def test_to_althex_lowercase(self):
        input = "1a3f"
        expected = "hukz"
        actual = to_althex(input)
        self.assertEqual(actual,expected)

    def test_to_althex_lowercase_2(self):
        input = "00ff"
        expected = "ggzz"
        actual = to_althex(input)
        self.assertEqual(actual, expected)
    
    def test_to_althex_mixed(self):
        input = "1A3f"
        expected = "hukz"        
        actual = to_althex(input)
        self.assertEqual(actual, expected)

    def test_to_althex_mixed_2(self):
        input = "00fF"
        expected = "ggzz"        
        actual = to_althex(input)
        self.assertEqual(actual, expected)
        
    def test_to_althex_uppercase(self):        
        self.assertEqual(to_althex("1A3F", use_uppercase=True), "HUKZ")  # Uppercase output forced
        self.assertEqual(to_althex("00FF", use_uppercase=True), "GGZZ")  # Uppercase output forced

if __name__ == "__main__":
    unittest.main()