import unittest
from althex import to_althex, from_althex

class TestAlthexConversion(unittest.TestCase):
    # to_althex のテスト
    def test_to_althex_lowercase(self):
        self.assertEqual(to_althex("1A3F"), "hukz")
        self.assertEqual(to_althex("00FF"), "ggzz")

    def test_to_althex_uppercase(self):
        self.assertEqual(to_althex("1A3F", use_uppercase=True), "HUKZ")
        self.assertEqual(to_althex("00FF", use_uppercase=True), "GGZZ")

    # from_althex のテスト
    def test_from_althex_lowercase(self):
        self.assertEqual(from_althex("hukz"), "1A3F")
        self.assertEqual(from_althex("ggzz"), "00FF")

    def test_from_althex_uppercase(self):
        self.assertEqual(from_althex("HUKZ", use_uppercase=True), "1A3F")
        self.assertEqual(from_althex("GGZZ", use_uppercase=True), "00FF")

    # ラウンドトリップテスト
    def test_round_trip(self):
        hex_values = ["1A3F", "00FF", "ABCD", "1234", "FACE"]
        for hex_value in hex_values:
            custom_value = to_althex(hex_value)
            round_trip_value = from_althex(custom_value)
            self.assertEqual(round_trip_value, hex_value)

if __name__ == '__main__':
    unittest.main()
