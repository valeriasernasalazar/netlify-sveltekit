import base64
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import padding
from dotenv import load_dotenv
import os

def encrypt_image(key, image_path):
    # Decode base64 key to bytes
    key = base64.b64decode(key)
    
    # Generate IV
    iv = os.urandom(16)

    # Read the image file in binary mode
    with open(image_path, 'rb') as image_file:
        image_data = image_file.read()

    # Pad image data
    padder = padding.PKCS7(128).padder()
    padded_image_data = padder.update(image_data) + padder.finalize()

    # Create cipher
    cipher = Cipher(algorithms.AES(key), modes.CBC(iv), backend=default_backend())

    # Encrypt
    encryptor = cipher.encryptor()
    ciphertext = encryptor.update(padded_image_data) + encryptor.finalize()

    # Return base64-encoded IV + ciphertext
    return base64.b64encode(iv + ciphertext).decode('utf-8')

def decrypt_image(key, encoded_ciphertext, output_path):
    # Decode base64 key to bytes
    key = base64.b64decode(key)
    
    # Decode the base64-encoded ciphertext
    ciphertext = base64.b64decode(encoded_ciphertext)
    
    # Separate IV and actual ciphertext
    iv = ciphertext[:16]
    ciphertext = ciphertext[16:]

    # Create cipher
    cipher = Cipher(algorithms.AES(key), modes.CBC(iv), backend=default_backend())

    # Decrypt
    decryptor = cipher.decryptor()
    padded_image_data = decryptor.update(ciphertext) + decryptor.finalize()

    # Unpad
    unpadder = padding.PKCS7(128).unpadder()
    image_data = unpadder.update(padded_image_data) + unpadder.finalize()

    # Write the decrypted image to a file
    with open(output_path, 'wb') as output_file:
        output_file.write(image_data)

# Example usage
load_dotenv(".env")
key = os.getenv('variable')  # This should be a base64-encoded string
encrypted_image = encrypt_image(key, 'pruebanec.png')
print(encrypted_image)

output_path = 'decrypted_image.jpg'
decrypt_image(key, encrypted_image, output_path)
print(f'Decrypted image saved to {output_path}')
