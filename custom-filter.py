#!/usr/bin/env python3
"""
custom-filter.py

This script integrates with git-filter-repo library to:
 1. Remove specified files from history
 2. Redact specified secret strings

It also includes a simple test suite to verify these behaviors.

Usage:
  # Run tests only
  python custom-filter.py --test

  # Apply filter to repository (must be run in repo root)
  python custom-filter.py
"""

import os
import sys
from git_filter_repo import RepoFilter, Blob

# Load file names to remove (no directory paths)
with open('filter-repo-files.txt', 'r') as f:
    filenames_to_remove = set(line.strip() for line in f if line.strip())

# Load secret strings to redact
with open('filter-repo-secrets.txt', 'r') as f:
    secrets_to_redact = [line.strip() for line in f if line.strip()]


def should_remove(path: str, filenames: set) -> bool:
    """Return True if the basename of path is in filenames_to_remove."""
    return os.path.basename(path) in filenames


def redact_content(data: str, secrets: list) -> str:
    """Replace each secret in data with '<REDACTED>'."""
    for secret in secrets:
        data = data.replace(secret, '<REDACTED>')
    return data


def blob_callback(blob: Blob):
    """
    Called for each blob in history.
    Drops blobs whose filename matches filenames_to_remove,
    otherwise redacts any secrets in blob data.
    """
    path = blob.original_path.decode('utf-8', errors='ignore')

    # Drop file if name matches
    if should_remove(path, filenames_to_remove):
        blob.skip()
        return

    # Redact secrets in file content
    content = blob.data.decode('utf-8', errors='ignore')
    new_content = redact_content(content, secrets_to_redact)
    if new_content != content:
        blob.data = new_content.encode('utf-8')


def run_tests():
    """
    Simple tests for should_remove, redact_content, and blob_callback.
    """
    # Test should_remove logic
    assert should_remove('path/to/remove.txt', {'remove.txt'})
    assert not should_remove('path/to/keep.txt', {'remove.txt'})

    # Test redact_content logic
    test_secret = 'SECRET123'
    original = f'foo {test_secret} bar'
    redacted = redact_content(original, [test_secret])
    assert '<REDACTED>' in redacted and test_secret not in redacted

    # Define DummyBlob for testing
    class DummyBlob:
        def __init__(self, path, data):
            self.original_path = path.encode('utf-8')
            self.data = data.encode('utf-8')
            self.skipped = False

        def skip(self):
            self.skipped = True

    # Test blob removal
    global filenames_to_remove
    filenames_to_remove = {'remove.txt'}
    blob1 = DummyBlob('dir/remove.txt', 'irrelevant')
    blob_callback(blob1)
    assert blob1.skipped, 'blob_callback should skip matching file'

    # Test secret redaction in blob data
    global secrets_to_redact
    secrets_to_redact = ['TOPSECRET']
    blob2 = DummyBlob('dir/keep.txt', 'data with TOPSECRET inside')
    blob_callback(blob2)
    assert not blob2.skipped, 'blob_callback should not skip non-matching file'
    assert '<REDACTED>' in blob2.data.decode(), 'blob_callback should redact secret'

    print('All tests passed.')


if __name__ == '__main__':
    if len(sys.argv) > 1 and sys.argv[1] == '--test':
        run_tests()
    else:
        # Prepare arguments for git-filter-repo main
        sys.argv = ['git-filter-repo', '--force', '--blob-callback', __file__]
        from git_filter_repo import main
        main()
