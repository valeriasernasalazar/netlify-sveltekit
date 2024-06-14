from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
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
from app import generar_id, insert_encrypt_data, get_db_connection, fetch_decrypt_one_user
import pandas as pd
import Levenshtein


ingresos = pd.read_excel('ingresos.xlsx')
ingresos['Fecha '] = ingresos['Fecha '].apply(lambda x: x.strftime('%Y-%m-%d'))
ingresos.columns = ['fecha', 'hombres', 'mujeres', 'niños', 'niñas', 'lgbtqi', 'total']
print(ingresos)

def insert_ingresos(table_name, data):
    column_names = ['fecha', 'hombres', 'mujeres', 'niños', 'niñas', 'lgbtqi', 'total']
    conn = get_db_connection()
    if conn is not None:
        try:
            cur = conn.cursor()
            #####data["id"] = generar_id()
            columns_to_insert = []
            values_to_insert = []

            for column in column_names:
                columns_to_insert.append(column)
                if column in data:
                    values_to_insert.append(f"'{data[column]}'")
                else:
                    values_to_insert.append("NULL")

            columns_str = ", ".join(columns_to_insert)
            values_str = ", ".join(values_to_insert)

            insert_query = f"INSERT INTO {table_name} ({columns_str}) VALUES ({values_str});"

            cur.execute(insert_query)

            conn.commit()
            print("Data added successfully.")

        except Exception as e:
            print("An error occurred:", e)
            conn.rollback()
        finally:
            cur.close()
            conn.close()
    else:
        print("Failed to connect to database")

# Cargar variables de entorno
load_dotenv(".env")

# Función para ajustar el padding de la clave Base64
def adjust_key_padding(key):
    missing_padding = len(key) % 4
    if missing_padding != 0:
        key += '=' * (4 - missing_padding)
    return key

# Cargar y ajustar la clave desde las variables de entorno
key = os.getenv('variable')
print('get env:', key)
if not key:
    raise ValueError("Key not found in environment variables")

# Ajustar el padding de la clave si es necesario
key = adjust_key_padding(key)
print('adjust padding: ', key)
# Decodificar la clave Base64
try:
    key = base64.b64decode(key)
except base64.binascii.Error as e:
    raise ValueError(f"Incorrect padding or invalid Base64 string: {e}")
print('decode: ', key)
# Verificar longitud de la clave después de decodificar
if len(key) not in [16, 24, 32]:
    raise ValueError(f"Invalid key size ({len(key)*8}) for AES. Key must be 128, 192, or 256 bits.")

def encrypt_data_aux(data, post, info_type=None, table_name=None):
    ################## AQUI LE BORRE LOS TRYES POR WEY

    encrypted_data = {}

    if post == 'yes':
        data['activo'] = 1 ##################################
        data['ultimaFecha'] = None ###########################
        data['id'] = generar_id()

    for field, value in data.items():
        if value:
            encrypted_value = encoding_(key, str(value), lower=True)
            encrypted_data[field] = encrypted_value

    # Insertar datos encriptados en la base de datos
    if post == 'yes':
        insert_encrypt_data(table_name, encrypted_data, info_type)
        return encrypted_data

    else:
        return encrypted_data
    # Desencriptar los datos para propósitos de validación
    #decrypted_data = decrypt_data(encrypted_data, key)

for index, row in ingresos.iterrows():
    encrypted = encrypt_data_aux(row.to_dict(), 'no')
    insert_ingresos('ingresos', encrypted)

profeta = fetch_decrypt_one_user('ingresos', 'admin')
print("h", profeta)
profeta2 = fetch_decrypt_one_user('migrantes', 'admin')
print("h", profeta2)
print("AAAAAAA", profeta2['tipo'])

def count_ingresos_(date_today):
    profeta = fetch_decrypt_one_user('migrantes', 'admin')
    print("PROFETA")
    print(profeta)
    profeta = profeta[profeta['fechaatencion'] == date_today]
    

    profeta['tipo'] = profeta['tipo'].replace({
        'Niña acompañada': 'niña', 
        'Niño acompañada': 'niño',
        'Niña no acompañada': 'niña', 
        'Niño no acompañado': 'niño'
    })

    # ya puedo hacer conteo de niñas y niños
    niños = profeta[(profeta['tipo'] == 'niño')].shape[0]
    niñas = profeta[(profeta['tipo'] == 'niña')].shape[0]
    # falta ver lo de adolescentes

    adultos = profeta[(profeta['tipo'] != 'niño') & (profeta['tipo'] != 'niña')] 
    adultos['sexo'] = adultos['sexo'].replace({
        'Mujer LGBTTTIQ+': 'LGBTQI+', 
        'Hombre LGBTTTIQ+': 'LGBTQI+'
    })

    comunidad = adultos[(adultos['sexo'] == 'LGBTQI+')].shape[0]
    hombre = adultos[(adultos['sexo'] == 'Hombre')].shape[0]
    mujer = adultos[(adultos['sexo'] == 'Mujer')].shape[0]
    total = niños + niñas + comunidad + hombre + mujer

    ingresos_today= {
        'fecha':date_today,
        'hombres':hombre,
        'mujeres':mujer, 
        'niños':niños, 
        'niñas':niñas, 
        'lgbtqi': comunidad,
        'total': total
    }
    
    ingresos_today = pd.DataFrame(ingresos_today, index=[0])

    print(ingresos_today)
    for index, row in ingresos_today.iterrows():
        encrypted = encrypt_data_aux(row.to_dict(), 'no')
        insert_ingresos('ingresos', encrypted)

profeta = fetch_decrypt_one_user('ingresos', 'admin')
#count_ingresos_('2024-06-11')
