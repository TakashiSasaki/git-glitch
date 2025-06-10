import unittest
import uuid
import random
from to_althex import to_althex
from from_althex import from_althex

class TestRoundtrip(unittest.TestCase):
    # from_althex tests
    def test_from_althex_lowercase(self):
        self.assertEqual(from_althex("hukz"), "1a3f")  # Lowercase output expected
        self.assertEqual(from_althex("ggzz"), "00ff")  # Lowercase output expected

    def test_from_althex_uppercase(self):
        self.assertEqual(from_althex("HUKZ"), "1A3F")  # Uppercase input
        self.assertEqual(from_althex("GGZZ"), "00FF")  # Uppercase input

    # ラウンドトリップテスト
    def test_round_trip(self):
        hex_values = ["1A3F", "00FF", "ABCD", "1234", "FACE"]
        for hex_value in hex_values:
            custom_value = to_althex(hex_value)
            round_trip_value = from_althex(custom_value)
            self.assertEqual(round_trip_value, hex_value)

    def test_uuid_round_trip(self):
        # UUID を生成
        original_uuid = uuid.uuid4().hex.upper()
        # UUID をカスタム16進数に変換
        custom_uuid = to_althex(original_uuid)
        # カスタム16進数を元のUUIDに戻す
        result_uuid = from_althex(custom_uuid)
        # 元のUUIDと結果が同じであることを確認
        self.assertEqual(original_uuid, result_uuid)

    def test_long_string_round_trip(self):
        # Generate a long string of random hexadecimal characters
        long_hex_string = ''.join(random.choice('0123456789ABCDEF') for _ in range(10000))
        custom_string = to_althex(long_hex_string)
        round_trip_result = from_althex(custom_string)
        self.assertEqual(long_hex_string, round_trip_result.upper())

if __name__ == '__main__':
    unittest.main()
