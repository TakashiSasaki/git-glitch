import httpimport
import unittest
import random

# Replace with the URL that directly serves the raw content of '__init__.py' for 'althex'
url = "https://althex.glitch.me/"

with httpimport.remote_repo(url):
  from althex.to_althex import to_althex
  from althex.from_althex import from_althex

class TestAlthexConversion(unittest.TestCase):
    def test_long_string_round_trip(self):
        # Generate a long string of random hexadecimal characters
        long_hex_string = ''.join(random.choice('0123456789ABCDEF') for _ in range(10000))
        custom_string = to_althex(long_hex_string)
        round_trip_result = from_althex(custom_string)
        self.assertEqual(long_hex_string, round_trip_result.upper())
unittest.main()