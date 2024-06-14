import base64
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import padding
import os

def encoding_(key, plaintext, lower=True):
    # Generate IV
    iv = os.urandom(16)
    plaintext_formatted = plaintext.encode("utf-8")
    if lower:
        plaintext_formatted = plaintext.encode("utf-8")

    # Pad plaintext
    padder = padding.PKCS7(128).padder()
    padded_plaintext = padder.update(plaintext_formatted) + padder.finalize()

    # Create cipher
    cipher = Cipher(algorithms.AES(key), modes.CBC(iv), backend=default_backend())

    # Encrypt
    encryptor = cipher.encryptor()
    ciphertext = encryptor.update(padded_plaintext) + encryptor.finalize()

    # Return base64-encoded IV + ciphertext
    return base64.b64encode(iv + ciphertext).decode('utf-8') ###########