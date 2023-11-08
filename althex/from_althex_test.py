import unittest
from from_althex import from_althex

class TestFromAlthex(unittest.TestCase):
    def test_uppercase_input(self):
        input_str = 'HUKZ'
        expected_output = '1A3F'
        self.assertEqual(from_althex(input_str), expected_output)
        self.assertEqual(len(input_str), len(expected_output))

    def test_lowercase_input(self):
        input_str = 'hukz'
        expected_output = '1a3f'
        self.assertEqual(from_althex(input_str), expected_output)
        self.assertEqual(len(input_str), len(expected_output))

    def test_explicit_uppercase_output(self):
        input_str = 'hukz'
        expected_output = '1A3F'
        self.assertEqual(from_althex(input_str, use_uppercase=True), expected_output)
        self.assertEqual(len(input_str), len(expected_output))

    def test_explicit_lowercase_output(self):
        input_str = 'HUKZ'
        expected_output = '1a3f'
        self.assertEqual(from_althex(input_str, use_uppercase=False), expected_output)
        self.assertEqual(len(input_str), len(expected_output))

    def test_empty_string(self):
        self.assertEqual(from_althex(''), '')

    def test_invalid_input(self):
        with self.assertRaises(ValueError):
            from_althex('invalid')

    def test_emoji_input(self):
        input_str = '🙂😉😊'
        # 絵文字はそのまま出力されるべきです
        self.assertEqual(from_althex(input_str), input_str)
        self.assertEqual(len(input_str), len(from_althex(input_str)))

    def test_kanji_input(self):
        input_str = '漢字'
        # 漢字もそのまま出力されるべきです
        self.assertEqual(from_althex(input_str), input_str)
        self.assertEqual(len(input_str), len(from_althex(input_str)))


# To run the tests
if __name__ == '__main__':
    unittest.main()
