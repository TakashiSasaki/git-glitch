import unittest
import from_althex import from_althex

class TestFromAlthex(unittest.TestCase):
    def test_uppercase_input(self):
        self.assertEqual(from_althex('HUKZ'), '1A3F')

    def test_lowercase_input(self):
        self.assertEqual(from_althex('hukz'), '1a3f')

    def test_explicit_uppercase_output(self):
        self.assertEqual(from_althex('hukz', use_uppercase=True), '1A3F')

    def test_explicit_lowercase_output(self):
        self.assertEqual(from_althex('HUKZ', use_uppercase=False), '1a3f')

    def test_empty_string(self):
        self.assertEqual(from_althex(''), '')

    def test_invalid_input(self):
        with self.assertRaises(ValueError):
            from_althex('invalid')

# To run the tests
if __name__ == '__main__':
    unittest.main()
