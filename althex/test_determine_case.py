import unittest
from determine_case import is_upper_althex, is_lower_althex, is_upper_stdhex, is_lower_stdhex

class TestDetermineCase(unittest.TestCase):
    def test_is_upper_althex(self):
        self.assertTrue(is_upper_althex('GHJKMNPRSTUVWXYZ'))
        self.assertFalse(is_upper_althex('ghjkmnprstuvwxyz'))
        self.assertFalse(is_upper_althex('0123456789'))
        self.assertFalse(is_upper_althex('abcABC'))

    def test_is_lower_althex(self):
        self.assertTrue(is_lower_althex('ghjkmnprstuvwxyz'))
        self.assertFalse(is_lower_althex('GHJKMNPRSTUVWXYZ'))
        self.assertFalse(is_lower_althex('0123456789'))
        self.assertFalse(is_lower_althex('abcABC'))

    def test_is_upper_stdhex(self):
        self.assertTrue(is_upper_stdhex('ABCDEF'))
        self.assertFalse(is_upper_stdhex('abcdef'))
        self.assertFalse(is_upper_stdhex('0123456789'))
        self.assertFalse(is_upper_stdhex('ghjkmnprstuvwxyz'))

    def test_is_lower_stdhex(self):
        self.assertTrue(is_lower_stdhex('abcdef'))
        self.assertFalse(is_lower_stdhex('ABCDEF'))
        self.assertFalse(is_lower_stdhex('0123456789'))
        self.assertFalse(is_lower_stdhex('GHJKMNPRSTUVWXYZ'))

if __name__ == '__main__':
    unittest.main()
