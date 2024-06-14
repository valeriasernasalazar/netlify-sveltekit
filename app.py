from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
import plotly.graph_objects as go
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
import Levenshtein
import datetime
from statsmodels.tsa.statespace.sarimax import SARIMAX
import numpy as np

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
if not key:
    raise ValueError("Key not found in environment variables")

# Ajustar el padding de la clave si es necesario
key = adjust_key_padding(key)

# Decodificar la clave Base64
try:
    key = base64.b64decode(key)
except base64.binascii.Error as e:
    raise ValueError(f"Incorrect padding or invalid Base64 string: {e}")

# Verificar longitud de la clave después de decodificar
if len(key) not in [16, 24, 32]:
    raise ValueError(f"Invalid key size ({len(key)*8}) for AES. Key must be 128, 192, or 256 bits.")

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route('/api/encrypt', methods=['POST'])
@cross_origin()  # Permitir solicitudes de todos los orígenes para esta ruta específica
def encrypt_data():
    try:
        data = request.json
        data['activo_CM'] = "si"
        data['ultimaFecha'] = None
        if not data:
            return jsonify({"status": "error", "message": "No data provided"}), 400

        encrypted_data = {}
        for field, value in data.items():
            if value:
                encrypted_value = encoding_(key, str(value), lower=True)
                encrypted_data[field] = encrypted_value

        # Insertar datos encriptados en la base de datos
        insert_encrypt_data("migrantes", encrypted_data)

        # Desencriptar los datos para propósitos de validación
        decrypted_data = decrypt_data(encrypted_data)
        return jsonify({"status": "success", "encrypted_data": encrypted_data, "decrypted_data": decrypted_data})

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

def insert_encrypt_data(table_name, data):
    column_names = [
        'id', 'abusoDerechos', 'abusoMexico', 'accesoMonarca', 'acompanante',
        'agresionAutoridades', 'como_viajo', 'contactoEmergencia', 'cualEnfermedad',
        'cuantoPago', 'curp', 'denunciaFormal', 'dep_est', 'descripcionHechos',
        'descripcionRed', 'destinoFinal', 'destinoMonterrey', 'documentoIdentidad',
        'edad', 'estacionMigratoria', 'estadoCivil', 'estadoEstacion', 'fechaAtencion',
        'fechaIngresoMexico', 'fechaNacimiento', 'fechaSalidaPais', 'fotoFrente',
        'fotoPerfilDerecho', 'fotoPerfilIzquierdo', 'grado_ac', 'idiomas', 'intentoEEUU',
        'lugarIngreso', 'nombreCompleto', 'numHijos', 'observacionesFinales', 'otroAlbergue',
        'otroIdioma', 'padeceAlergia', 'padeceEnfermedad', 'pagoGuia', 'paisOrigen',
        'puedeRegresar', 'quienAbuso', 'razonMonterrey', 'razonNoAcceso', 'razonNoDenuncia',
        'razonNoRegreso', 'razonSalida', 'redApoyoEEUU', 'redApoyoMonterrey', 'sabeLeerEscribir',
        'senasParticulares', 'serviciosBrindados', 'sexo', 'solucionBrindada', 'telefono',
        'tiempoRed', 'tieneHijos', 'tipo', 'tipoAbuso', 'tipoAbusoMexico', 'tipoAlergia',
        'tipoDocMigratorio', 'tipoPoblacion', 'tratamientoMedico', 'ubicacionContactoEmergencia',
        'ultimoAlbergue', 'ultimoGrado', 'viajando', 'activo_CM', 'ultimaFecha', 'estado_migracion'
    ]
    conn = get_db_connection()
    if conn is not None:
        try:
            cur = conn.cursor()
            data["id"] = generar_id()
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

        except Exception as e:
            print("An error occurred:", e)
            conn.rollback()
        finally:
            cur.close()
            conn.close()
    else:
        print("Failed to connect to database")

def decrypt_data(encrypted_data):
    decrypted_data = {}
    for field, value in encrypted_data.items():
        if value:
            decrypted_value = decoding_(key, value)
            decrypted_data[field] = decrypted_value
    return decrypted_data

def generar_id():
    caracteres = string.ascii_letters + string.digits
    id_generado = ''.join(random.choices(caracteres, k=6))
    id_generado = encoding_(key, str(id_generado), lower=True)
    return id_generado

def get_db_connection():
    try:
        params = config(section="DB5")
        connection = psycopg2.connect(**params)
        return connection
    except Exception as e:
        print("An error occurred while connecting to the database:", e)
        return None
    
def find_most_similar_name(input_name, df):
    min_distance = float('inf')
    most_similar_name = None
    
    # Filtrar solo las filas que tienen nombre no nulo
    filtered_df = df[df['nombrecompleto'].notna()]
    
    for name in filtered_df['nombrecompleto'].tolist():
        if name:  # Asegurarnos de que el nombre no sea None
            distance = Levenshtein.distance(input_name, name)
            if distance < min_distance:
                min_distance = distance
                most_similar_name = name
    
    return most_similar_name

@app.route('/api/decrypt', methods=['POST'])
@cross_origin()
def get_migrant():
    try:
        data = request.json
        if not data:
            return jsonify({"status": "error", "message": "No data provided"}), 400

        nombre_completo = data.get('nombrecompleto')
        fecha_nacimiento = data.get('fechanacimiento')

        # Validar que nombre_completo y fecha_nacimiento no sean None
        if not nombre_completo or not fecha_nacimiento:
            return jsonify({"status": "error", "message": "Nombre completo o fecha de nacimiento faltan"}), 400

        # Convertir a minúsculas
        nombre_completo = nombre_completo
        fecha_nacimiento = fecha_nacimiento

        # Desencriptar datos del migrante
        df = fetch_decrypt_one_user("migrantes", "postgres")

        if df.empty:
            return jsonify({"status": "error", "message": "No data found in the database"}), 404

        # Encontrar el nombre más similar
        most_similar_name = find_most_similar_name(nombre_completo, df)

        # Filtrar el DataFrame para encontrar el migrante
        migrant = df[(df["fechanacimiento"].notna()) & 
                     (df["fechanacimiento"] == fecha_nacimiento) & 
                     (df["nombrecompleto"] == most_similar_name)].copy()

        if not migrant.empty:
            return jsonify({"status": "success", "data": migrant.to_dict(orient='records')})
        else:
            return jsonify({"status": "error", "message": "Usuario no encontrado"}), 404
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

def fetch_decrypt_one_user(table_name, username):
    conn = get_db_connection()
    decrypted_data = pd.DataFrame()
    if conn is not None:
        try:
            cur = conn.cursor()
            cur.execute(f"SELECT column_name FROM information_schema.columns WHERE table_name = '{table_name}';")
            columns = [row[0] for row in cur.fetchall()]

            sql_command = f"SELECT * FROM {table_name}"
            cur.execute(sql_command)
            result = pd.DataFrame(cur.fetchall(), columns=columns)

            for index, row in result.iterrows():
                decrypted_row = {}
                for column in columns:
                    value = row[column]
                    if value is not None:
                        try:
                            if isinstance(value, memoryview):
                                value = value.tobytes()
                            decrypted_value = decoding_(key, value)
                            if isinstance(decrypted_value, bytes):
                                decrypted_value = decrypted_value.decode("utf-8")

                            decrypted_row[column] = decrypted_value
                        except Exception as e:
                            decrypted_row[column] = value
                    else:
                        decrypted_row[column] = value

                temp_df = pd.DataFrame([decrypted_row])
                decrypted_data = pd.concat([decrypted_data, temp_df], ignore_index=True)
        except Exception as e:
            conn.rollback()
            print(f"Error during decryption: {e}")
        finally:
            cur.close()
            conn.close()
    
    return decrypted_data

def fetch_decrypt_migrantes_user():
    conn = get_db_connection()
    if conn is not None:
        try:
            cur = conn.cursor()
            cur.execute("SELECT * FROM migrantes;")
            columns = [desc[0] for desc in cur.description]
            result = cur.fetchall()
            cur.close()
            conn.close()
            
            migrantes_df = pd.DataFrame(result, columns=columns)
            
            decrypted_data = []
            for index, row in migrantes_df.iterrows():
                decrypted_row = {}
                for column in columns:
                    value = row[column]
                    if value is not None:
                        try:
                            if isinstance(value, memoryview):
                                value = value.tobytes()
                            decrypted_value = decoding_(key, value)
                            if isinstance(decrypted_value, bytes):
                                decrypted_value = decrypted_value.decode("utf-8")
                            decrypted_row[column] = decrypted_value
                        except Exception as e:
                            decrypted_row[column] = value
                    else:
                        decrypted_row[column] = value
                decrypted_data.append(decrypted_row)
            
            decrypted_df = pd.DataFrame(decrypted_data)
            return decrypted_df

        except Exception as e:
            print(f"Error during decryption: {e}")
            return pd.DataFrame()
    else:
        print("Failed to connect to database")
        return pd.DataFrame()

@app.route('/api/encrypt_services', methods=['POST'])
@cross_origin()
def encrypt_services_data():
    try:
        data = request.json
        if not data:
            return jsonify({"status": "error", "message": "No data provided"}), 400

        required_fields = ['nombreCompleto', 'fechanacimiento', 'servicios', 'usuario', 'fecharec']
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({"status": "error", "message": f"Missing or empty field: {field}"}), 400

        # Obtener y desencriptar los datos de la tabla migrantes
        nombre_completo = data['nombreCompleto']
        fecha_nacimiento = data['fechanacimiento']
        
        migrantes_df = fetch_decrypt_migrantes_user()
        
        if migrantes_df.empty:
            return jsonify({"status": "error", "message": "No se encontraron datos en la tabla migrantes"}), 404

        # Encontrar el nombre más similar
        most_similar_name = find_most_similar_name(nombre_completo, migrantes_df)

        # Filtrar el DataFrame desencriptado
        migrante = migrantes_df[
            (migrantes_df['fechanacimiento'] == fecha_nacimiento) & 
            (migrantes_df['nombrecompleto'] == most_similar_name)
        ]

        if migrante.empty:
            return jsonify({"status": "error", "message": "Migrante no encontrado"}), 404

        id_migrante = migrante.iloc[0]['id']
        data['id'] = id_migrante  # Asegúrate de que el id no se encripte
        data['nombreCompleto'] = most_similar_name  # Reemplaza el nombre con el más similar encontrado
        
        encrypted_data = {}
        for field, value in data.items():
            if value and field != 'id':  # No encriptar el campo id
                encrypted_value = encoding_(key, str(value), lower=False)
                encrypted_data[field] = encrypted_value
            else:
                encrypted_data[field] = value  # Añadir el id desencriptado directamente

        # Insertar datos encriptados en la base de datos 'servicios'
        insert_encrypt_services_data(encrypted_data)

        # Desencriptar los datos para propósitos de validación
        decrypted_data = decrypt_data(encrypted_data)
        return jsonify({"status": "success", "encrypted_data": encrypted_data, "decrypted_data": decrypted_data})

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

def insert_encrypt_services_data(data):
    column_names = [
        'id', 'edad', 'nombreCompleto', 'paisOrigen', 'sexo', 
        'activo_CM', 'estado_migracion', 'servicios', 'usuario', 'fecharec', 'area'
    ]
    
    conn = get_db_connection()
    if conn is not None:
        try:
            cur = conn.cursor()

            # Obtener todos los IDs encriptados de la base de datos
            cur.execute("SELECT id FROM migrantes;")
            all_encrypted_ids = [row[0] for row in cur.fetchall()]
            
            # Desencriptar todos los IDs para la comparación
            all_ids = [decoding_(key, encrypted_id) for encrypted_id in all_encrypted_ids]

            # Usar el id desencriptado directamente
            id_migrante = data.get('id')
            if id_migrante not in all_ids:
                raise ValueError(f"El ID '{id_migrante}' no se encuentra en la base de datos.")
            
            # Encontrar el ID encriptado correspondiente
            encrypted_id_migrante = all_encrypted_ids[all_ids.index(id_migrante)]

            cur.execute("SELECT edad, paisOrigen, sexo, activo_CM, estado_migracion FROM migrantes WHERE id = %s;", (encrypted_id_migrante,))
            migrante_data = cur.fetchone()
            
            if not migrante_data:
                raise ValueError("Migrante con el id especificado no encontrado")
            

            # Convertir memoryview a string
            migrante_data = tuple(memoryview_to_str(value) if isinstance(value, memoryview) else value for value in migrante_data)

            # Añadir los datos del migrante a los datos a insertar
            migrante_columns = ['edad', 'paisOrigen', 'sexo', 'activo_CM', 'estado_migracion']
            for i, col in enumerate(migrante_columns):
                data[col] = migrante_data[i]

            # Generar un nuevo id para la tabla servicios
            #data["id"] = memoryview_to_str(encrypted_id_migrante)
            data["id"] = encoding_(key, data["id"], lower=False)

            
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

            insert_query = f"INSERT INTO servicios ({columns_str}) VALUES ({values_str});"

            cur.execute(insert_query)
            conn.commit()
            print("Data added successfully to 'servicios'.")

        except Exception as e:
            print("An error occurred:", e)
            conn.rollback()
        finally:
            cur.close()
            conn.close()
    else:
        print("Failed to connect to database")

def memoryview_to_str(mv):
    if isinstance(mv, memoryview):
        return mv.tobytes().decode('utf-8')
    return mv

@app.route('/api/decrypt_services', methods=['POST'])
@cross_origin()
def get_services():
    try:
        data = request.json
        if not data:
            return jsonify({"status": "error", "message": "No data provided"}), 400

        nombre_completo = data.get('nombrecompleto')
        fecha_nacimiento = data.get('fechanacimiento')

        if not nombre_completo or not fecha_nacimiento:
            return jsonify({"status": "error", "message": "Missing required fields"}), 400

        nombre_completo = nombre_completo
        fecha_nacimiento = fecha_nacimiento

        # Buscar en la tabla migrantes para obtener el id del migrante
        df_migrantes = fetch_decrypt_one_user("migrantes", "postgres")
        
        if df_migrantes.empty:
            return jsonify({"status": "error", "message": "No migrants found in the database"}), 404

        most_similar_name = find_most_similar_name(nombre_completo, df_migrantes)

        migrante = df_migrantes[(df_migrantes["fechanacimiento"] == fecha_nacimiento) & 
                                (df_migrantes["nombrecompleto"] == most_similar_name)].copy()

        if migrante.empty:
            return jsonify({"status": "error", "message": "Migrant not found"}), 404

        # Obtener el id del migrante
        migrante_id = migrante.iloc[0]['id']

        # Buscar en la tabla servicios usando el id del migrante
        df_servicios = fetch_decrypt_services_user()
        
        if df_servicios.empty:
            return jsonify({"status": "error", "message": "No services found in the database"}), 404

        # Filtrar por el id del migrante
        servicios = df_servicios[df_servicios["id"] == migrante_id].copy()

        if not servicios.empty:
            # Convertir todos los datos a formato string para evitar problemas de serialización
            servicios_dict = servicios.to_dict(orient='records')
            for servicio in servicios_dict:
                for key in servicio:
                    if isinstance(servicio[key], bytes):
                        servicio[key] = servicio[key].decode('utf-8')

            return jsonify({"status": "success", "data": servicios_dict})
        else:
            return jsonify({"status": "error", "message": "No services found for this user"}), 404
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"status": "error", "message": str(e)}), 500

def fetch_decrypt_services_user():
    conn = get_db_connection()
    decrypted_data = pd.DataFrame()
    if conn is not None:
        try:
            cur = conn.cursor()
            cur.execute(f"SELECT column_name FROM information_schema.columns WHERE table_name = 'servicios';")
            columns = [row[0] for row in cur.fetchall()]

            sql_command = f"SELECT * FROM servicios"
            cur.execute(sql_command)
            result = pd.DataFrame(cur.fetchall(), columns=columns)

            for index, row in result.iterrows():
                decrypted_row = {}
                for column in columns:
                    value = row[column]
                    if value is not None:
                        try:
                            if isinstance(value, memoryview):
                                value = value.tobytes()
                            decrypted_value = decoding_(key, value)
                            if isinstance(decrypted_value, bytes):
                                decrypted_value = decrypted_value.decode("utf-8")

                            decrypted_row[column] = decrypted_value
                        except Exception as e:
                            decrypted_row[column] = value
                    else:
                        decrypted_row[column] = value

                temp_df = pd.DataFrame([decrypted_row])
                decrypted_data = pd.concat([decrypted_data, temp_df], ignore_index=True)
        except Exception as e:
            conn.rollback()
            print(f"Error during decryption: {e}")
        finally:
            cur.close()
            conn.close()
    
    return decrypted_data

@app.route('/api/darDeBaja', methods=['POST'])
@cross_origin()
def edit_migrant():
    try:
        data = request.json
        if not data:
            return jsonify({"status": "error", "message": "No data provided"}), 400
        
        nombre_completo = data.get('nombrecompleto')
        fecha_nacimiento = data.get('fechanacimiento')

        if not nombre_completo or not fecha_nacimiento:
            return jsonify({"status": "error", "message": "Missing required fields"}), 400

       # nombre_completo = nombre_completo.lower()
       # fecha_nacimiento = fecha_nacimiento.lower()

        df = fetch_decrypt_migrantes_user()

        most_similar_name = find_most_similar_name(nombre_completo, df)
        migrant = df[(df["fechanacimiento"] == fecha_nacimiento) & (df["nombrecompleto"] == most_similar_name)].copy()

        if migrant.empty:
            return jsonify({"status": "error", "message": "Usuario no encontrado"}), 404

        edit_migrant_aux(data, data['ultimaFecha'], migrant)

        return jsonify({"status": "success"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


def edit_migrant_aux(data, ultimafecha, migrant):
    # Obtener el migrante a partir de la búsqueda
    if 'empty' in migrant.columns:
        print("edit_migrant_aux: No migrant found for the given search criteria.")
        return

    data['activo_CM'] = "no"
    data['ultimaFecha'] = ultimafecha

    encrypted_data = {}

    # Encriptar los campos
    for field, value in data.items():
        if value is not None:
            encrypted_value = encoding_(key, str(value), lower=True)
            encrypted_data[field] = encrypted_value

    # Verificar que los campos encriptados existen
    if 'activo_CM' not in encrypted_data or 'ultimaFecha' not in encrypted_data:
        print("edit_migrant_aux: Error: campos encriptados faltantes.")
        return
    else:
        print("Todo bien")

    # Conexión a la base de datos
    conn = get_db_connection()
    if conn is not None:
        try:
            cur = conn.cursor()
            # Obtener el ID encriptado del migrante
            migrant_id_encrypted = get_id(migrant)
            print(f"edit_migrant_aux: migrant_id_encrypted={migrant_id_encrypted}")
            
            # Consulta de actualización
            query = """
            UPDATE migrantes
            SET activo_cm = %s, ultimafecha = %s
            WHERE id = %s;
            """

            # Ejecutar la consulta
            cur.execute(query, (encrypted_data['activo_CM'], encrypted_data['ultimaFecha'], migrant_id_encrypted))
            conn.commit()
            print("edit_migrant_aux: Data edited successfully.")

        except Exception as e:
            conn.rollback()
            print(f"edit_migrant_aux: Error during update: {e}")
        finally:
            cur.close()
            conn.close()
    else:
        print("edit_migrant_aux: Error: no se pudo obtener la conexión a la base de datos.")

def get_id(migrant):
    try:
        if not migrant.empty:
            df_encrypted = fetch_all_data("migrantes", "postgres")
            if not (df_encrypted.empty):
                id_encrypted = df_encrypted.iloc[migrant.index[0]]
                return id_encrypted['id']
        return None
    except Exception as e:
        print(e)
        return None


def fetch_all_data(table_name, username):
    conn = get_db_connection()
    if conn is not None:
        try:
            cur = conn.cursor()
            cur.execute(f"SELECT column_name FROM information_schema.columns WHERE table_name = '{table_name}';")
            columns = [row[0] for row in cur.fetchall()]

            sql_command = f"SELECT * FROM {table_name}"
            cur.execute(sql_command)
            result = pd.DataFrame(cur.fetchall(), columns=columns)
        except Exception as e:
            conn.rollback()
            print(f"Error during decryption: {e}")
        finally:
            cur.close()
            conn.close()
    else:
        result = pd.DataFrame()
    
    return result

@app.route('/api/countingresos', methods=['POST'])
@cross_origin()
def count_ingresos_endpoint():
    data = request.get_json()
    get_missing()
    date = data.get('date')
    if not date:
        return jsonify({'error': 'Date is required'}), 400
    
    try:
        count_ingresos_(date)
        return jsonify({'status': 'success'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


def get_missing():
    # Extraer toda la db de ingresos
    ingresos = fetch_decrypt_one_user("ingresos", "postgres")
    print(ingresos)
    
    # Asegurarse de que la columna 'fecha' está en formato datetime
    ingresos["fecha"] = pd.to_datetime(ingresos["fecha"]).dt.date

    # Generar rango de fechas desde la fecha mínima en ingresos hasta el día de hoy
    today = datetime.date.today()
    fecha_min = min(ingresos["fecha"])
    rango_fechas = pd.date_range(start=fecha_min, end=today).to_pydatetime()

    # Convertir rango de fechas a lista de objetos date
    rango_fechas = [fecha.date() for fecha in rango_fechas]

    # Obtener las fechas de ingresos en formato date
    fechas_ingresos = set(ingresos["fecha"])

    # Encontrar fechas faltantes
    fechas_faltantes = [fecha for fecha in rango_fechas if fecha not in fechas_ingresos]

    # Convertir las fechas faltantes a cadenas
    fechas_faltantes_str = [fecha.strftime("%Y-%m-%d") for fecha in fechas_faltantes]
    print(fechas_faltantes)
    # Imprimir fechas faltantes para depuración
    for fecha_faltante in fechas_faltantes: 
        count_ingresos_(fecha_faltante)


def count_ingresos_(date_today):
    profeta = fetch_decrypt_one_user('migrantes', 'admin')
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

@app.route('/api/modelo', methods=['POST'])
@cross_origin()
def sarima():
    get_missing()
    data = request.get_json()
    days = data.get('days')
    print("days", days)
    if not days:
        return jsonify({'error': 'Days is required'}), 400
    try:
        #df = pd.read_excel('ingresos.xlsx') ########## aca seria el fetch decrypt
        ingresos = fetch_decrypt_one_user("ingresos", "admin")
        ingresos.drop_duplicates(keep='last', inplace=True)
        ingresos.columns = ['fecha', 'hombres', 'mujeres', 'niños', 'niñas', 'lgbtqi', 'total']
        
        # Validar y corregir el formato de las fechas
        ingresos['fecha'] = pd.to_datetime(ingresos['fecha'], errors='coerce')
        ingresos = ingresos.dropna(subset=['fecha'])
        
        # Convertir las columnas numéricas a números
        numeric_columns = ['hombres', 'mujeres', 'niños', 'niñas', 'lgbtqi', 'total']
        for column in numeric_columns:
            ingresos[column] = pd.to_numeric(ingresos[column], errors='coerce')
        
        # Eliminar filas con valores no numéricos en las columnas numéricas
        ingresos = ingresos.dropna(subset=numeric_columns)
        
        # Ordenar el DataFrame por la columna de fechas
        ingresos = ingresos.sort_values(by='fecha')
        
        forecasts = create_models(ingresos, days)
        base_dir = os.path.dirname(os.path.abspath(__file__))
        output_path = os.path.join(base_dir, 'static', 'evolucion_ingresos.html')

        generar_grafica_ingresos(ingresos, forecasts, output_path=output_path)

        return jsonify({'status': 'success'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def fit_sarima_model(data, column, dias):
    print("column", column)
    data[column] += np.random.normal(0, data[column].std() * 0.1, size=len(data))
    df_sarima = data.set_index('fecha')[column]

    if column != 'hombres':
        model = SARIMAX(df_sarima, order=(1, 1, 1), seasonal_order=(1, 1, 1, 12))
    else:
        model = SARIMAX(df_sarima, order=(1, 1, 1))

    results = model.fit(disp=False)
    
    future_index = pd.date_range(start=data['fecha'].iloc[-1], periods=dias+1, closed='right')
    forecast = results.get_forecast(steps=dias)
    forecast_df = forecast.summary_frame()

    forecast_df['ds'] = future_index
    forecast_df = forecast_df[['ds', 'mean']].rename(columns={'mean': 'yhat'})
    return model, forecast_df

def create_models(df, dias):
    forecasts = {}
    # Entrenar un modelo para cada columna
    for column in df.columns[1:-1]:
        model, forecast = fit_sarima_model(df, column, dias)
        forecasts[column] = forecast

    total_forecast = pd.DataFrame({'ds': forecasts[list(forecasts.keys())[0]]['ds']})
    total_forecast['yhat'] = sum(forecast['yhat'].round().astype(int) for forecast in forecasts.values())
    forecasts['total'] = total_forecast

    return forecasts

def generar_grafica_ingresos(df, forecasts, output_path="/static/evolucion_ingresos.html"):
    colors = {
        'hombres': 'blue',
        'mujeres': 'hotpink',
        'niños': 'deepskyblue',
        'niñas': 'deeppink',
        'lgbtqi': 'red',
        'total': 'orange'
    }

    # Create a figure
    fig = go.Figure()

    # Graficar las predicciones
    for column in df.columns[1:]:
        forecast = forecasts[column]
        # Graficar predicciones con línea punteada
        fig.add_trace(go.Scatter(x = forecast['ds'], y = forecast['yhat'].round().astype(int), mode='lines', name=f'Predicción {column}', line=dict(dash='dot', color=colors[column])))
        # Graficar valores reales con línea sólida
        fig.add_trace(go.Scatter(x = df['fecha'], y = df[column].round().astype(int), mode='lines', name=f'Real {column}', line=dict(dash='solid', color = colors[column])))

    # Add vertical line
    fig.add_shape(
        type='line',
        x0=df['fecha'].iloc[-1],
        y0=0,
        x1=df['fecha'].iloc[-1],
        y1=1,
        xref='x',
        yref='paper',
        line=dict(color='black', dash='dash'),
        name='Inicio de la predicción'
    )

    # Agregar una línea vertical invisible para la leyenda
    fig.add_trace(go.Scatter(
        x=[df['fecha'].iloc[-1], df['fecha'].iloc[-1]],
        y=[0, 1],
        mode='lines',
        line=dict(color='black', dash='dash'),
        name='Inicio de la predicción'
    ))

    fig.update_layout(
        title='Evolución de ingresos',
        xaxis_title='Días',
        yaxis_title='Ingresos',
        legend_title='Leyenda'
    )

    # Agregar características interactivas
    fig.update_traces(mode='lines')

    # Guardar como archivo HTML
    fig.write_html(output_path)

    return output_path

# Ejemplo de uso:
# df = pd.read_csv('ruta/a/tu/dataframe.csv')
# forecasts = {'hombres': pd.read_csv('ruta/a/tu/forecast_hombres.csv'), ...}
# ruta_html = generar_grafica_ingresos(df, forecasts)
# print(f"La gráfica se ha guardado en: {ruta_html}")


if __name__ == '__main__':
    app.run(debug=True)
