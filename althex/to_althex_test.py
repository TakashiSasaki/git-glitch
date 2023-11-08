from to_althex import to_althex
import unittest

class TestToAltHex(unittest.TestCase):
    # to_althex tests
    def test_to_althex_lowercase(self):
        self.assertEqual(to_althex("1a3f"), "hukz")  # Lowercase input
        self.assertEqual(to_althex("00ff"), "ggzz")  # Lowercase input

    def test_to_althex_uppercase(self):
        self.assertEqual(to_althex("1A3F", use_uppercase=True), "HUKZ")  # Uppercase output forced
        self.assertEqual(to_althex("00FF", use_uppercase=True), "GGZZ")  # Uppercase output forced
  
if __name__ == "__main__":
    unittest.main()