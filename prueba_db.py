from flask import Flask, request, jsonify
from cryptography.fernet import Fernet
import json
import psycopg2
import psycopg2.extras
import os
from dotenv import load_dotenv
import base64
import string
import random
from config import config
from f_encoding import encoding_
from f_decoding import decoding_
import pandas as pd

# Cargar las variables de entorno
load_dotenv()

# Función para obtener la conexión a la base de datos
def get_db_connection():
    try:
        params = config(section="DB5")
        connection = psycopg2.connect(**params)
        return connection
    except Exception as e:
        print("An error occurred while connecting to the database:", e)
        return None

# Obtener la clave de encriptación desde las variables de entorno y asegurar que tiene el tamaño adecuado
key = os.getenv('variable')
if key is not None:
    # Decodificar la clave desde base64 y verificar la longitud
    key = base64.urlsafe_b64decode(key)
    if len(key) not in {16, 24, 32}:  # AES requiere claves de 128, 192 o 256 bits (16, 24 o 32 bytes)
        raise ValueError(f"Invalid key size: {len(key)}. Key must be 16, 24, or 32 bytes long.")

# Función para recuperar y desencriptar la información de un usuario
def fetch_decrypt_one_user(table_name, username, key):
    # Establecer la conexión con la base de datos
    conn = get_db_connection()
    if conn is not None:
        try:
            cur = conn.cursor()
            # Obtener los nombres de las columnas de la tabla
            cur.execute(f"SELECT column_name FROM information_schema.columns WHERE table_name = '{table_name}';")
            columns = [row[0] for row in cur.fetchall()]

            # Comando SQL para recuperar todos los datos del usuario
            sql_command = f"SELECT * FROM {table_name}"
            cur.execute(sql_command, (username,))
            result = cur.fetchone()

            if result is not None:
                decrypted_data = {}
                # Desencriptar los datos de las columnas correspondientes
                for i, (column, value) in enumerate(zip(columns, result)):
                    if value is not None:  # Verificar si el valor no es None
                        try:
                            if isinstance(value, memoryview):
                                value = value.tobytes()
                            decrypted_value = decoding_(key, value)
                            # Solo decodificar si el valor desencriptado es de tipo bytes
                            if isinstance(decrypted_value, bytes):
                                decrypted_value = decrypted_value.decode("utf-8")
                            decrypted_data[column] = decrypted_value
                        except Exception as e:
                            print(f"Error decrypting column {column}: {e}")
                            decrypted_data[column] = value
                    else:
                        decrypted_data[column] = value
                else:
                    decrypted_data[column] = None

                # Mostrar los datos desencriptados
                for key, value in decrypted_data.items():
                    print(f'* {key}: {value}')

            else:
                print("No user found with that username.")
        except Exception as e:
            print("An error occurred:", e)
            conn.rollback()  # Deshacer la transacción en caso de error
        finally:
            # Cerrar la conexión con la base de datos
            cur.close()
            conn.close()
    else:
        print("Failed to connect to database")
    df = pd.DataFrame(decrypted_data,index=[0])
    print(df)

# Llamar a la función para recuperar y desencriptar la información del usuario
fetch_decrypt_one_user("migrantes", "postgres", key)
