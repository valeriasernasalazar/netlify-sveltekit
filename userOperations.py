import psycopg2
import psycopg2.extras
from config import config
from f_decoding import decoding_ 
from f_encoding import encoding_




#Connect to the database
def get_db_connection():

    try:
        params =  config(section="DB5")
        connection = psycopg2.connect(**params)

        return (connection,params)
    except Exception as e:
        print("An error occurred while connecting to the database:", e)
        return None
    


#Insert and Encrypt the data
def insert_encrypt_data(table_name,columns,data_user,key):
    # Establish a connection to the database
    conn,conn_params = get_db_connection()
    if conn is not None:
        try:
            cur = conn.cursor()
            # Prepare the SQL command
            placeholders = ', '.join(['%s'] * len(columns))
            column_names = ', '.join(columns)

            # Execute the SQL command
            sql_command = f"INSERT INTO {table_name} ({column_names}) VALUES ({placeholders});"

            encoded_data = [tuple(encoding_(key, item) if i > 0 else item for i, item in enumerate(data_user))] #encrypt all the data except the first element (username)


            cur.executemany(sql_command,encoded_data)

            # Commit the changes to the database
            conn.commit()
            print(encoded_data)
            print("Data added successfully.")

        except Exception as e:
            print("An error occurred:", e)
            conn.rollback()  # Rollback the transaction on error
        finally:
            # Close the database connection
            cur.close()
            conn.close()
    else:
        print("Failed to connect to database") 


def fetch_decrypt_one_user(table_name, username, key):
    # Establish a connection to the database
    conn, conn_params = get_db_connection()
    if conn is not None:
        try:
            cur = conn.cursor()
            # Fetch metadata about the columns in the table to identify which are encrypted
            cur.execute(f"SELECT column_name FROM information_schema.columns WHERE table_name = '{table_name}';")
            columns = [row[0] for row in cur.fetchall()]

            # Prepare the SQL command to fetch all user data
            sql_command = f"SELECT * FROM {table_name} WHERE nombre = %s;"

            # Execute the SQL command
            cur.execute(sql_command, (username,))
            result = cur.fetchone()
            #print(result)

            if result is not None:
                decrypted_data = {}
                i = 0
                for column, value in zip(columns, result):
                    if i  > 2:  # Assuming encrypted fields contain 'encrypted' in their name
                        #decrypted_data[column] = decoding_(key, value)
                        decrypted_value = decoding_(key,value)
                        decrypted_value = decrypted_value.decode("utf-8")
                        decrypted_data[column] = decrypted_value
                    else:
                        decrypted_data[column] = value
                    i += 1

                #print(f"Decrypted Data for {username}:\n {decrypted_data}")
                #data_list = [decrypted_data]
                for key,value in decrypted_data.items():
                    print(f'* {key}: {value}')

                #Use tabulate to display the dictionary as a table
                #decrypted_data_table = tabulate(data_list, headers='keys', tablefmt='grid')
                #print(decrypted_data_table)
            else:
                print("No user found with that username.")

        except Exception as e:
            print("An error occurred:", e)
            conn.rollback()  # Rollback the transaction on error
        finally:
            # Close the database connection
            cur.close()
            conn.close()
    else:
        print("Failed to connect to database")



def new_migrant(key):
    try:
        nombre_input = input("Nombre completo ")
        tipo_poblacion_input = input("Tipo de población ")
        demografia_input = input("Adulto, NNA, NNAnA ")
        numero_telefonico_input = input("Número telefónico de contacto ")
        sexo_input = input("Sexo ")
        fecha_nacimiento_input = input("Fecha de nacimiento ")
        pais_origen_input = input("País de origen ")
        departamento_estado_input =  input("Departamento / Estado ")
        estado_civil_input = input("Estado Civil ")
        documento_identidad_input = input("Documento de identidad ")
        hijos_input = input("Hijos")
        alfabetismo_input = input("¿Usted sabe leer y escribir? ")
        grado_estudio_input = input("¿Cuál fue su último grado de estudio? ")
        idioma_input = input("Idiomas que domina. ")
        fecha_salida_input = input("Fecha en que salió de su país de origen ")
        acompañantes_viaje_input = input("¿Cómo se encuentra viajando? ")
        estado_viaje_input = input("¿Cómo viajó? ")
        razon_viaje_input = input("¿Por qué razón tomó la decisión de salir de su país? ")
        abuso_extranjero_input = input("Durante su viaje desde que salió de su país hasta antes de llegar a México, ¿Usted sufrió de algún abuso a sus Derechos Humanos? ")
        abuso_nacional_input = input("Cuando usted entró a territorio mexicano, ¿Usted vivió algún abuso o agresión? ")
        pago_guia_input = input("En algún momento de su camino, ¿Usted le pagó a algún guía para viajar? ")
        fecha_ingreso_input =  input("Fecha en que ingresó a México. ")
        lugar_ingreso_input =  input("¿Por dónde ingresó a México? ")
        destino_final_input = input("¿Cuál es su destino final? ")
        red_apoyo_input = input("¿Cuenta con una red de apoyo en Monterrey? ")
        intento_ingreso_eua_input = input("¿Usted ha intentado ingresar a Estados Unidos? ")
        red_apoyo_eua_input = input("¿Usted cuenta con una red de apoyo en Estados Unidos? ")
        descripcion_red_apoyo_eua_input = input("Descripción de la red de apoyo con la que cuenta en Estados Unidos ")
        estacion_migratoria_input = input("¿Usted ha estado en alguna estación migratoria? ")
        denuncia_input = input("Ante las vivencias de abuso de autoridad, agresiones y vulnerabilidad a Derechos Humanos, ¿Usted interpuso una denuncia formal? ")
        regresar_pais_origen_input = input("¿Usted puede regresar a su país? ")
        enfermedad_input = input("¿Actualmente usted padece alguna enfermedad? ")
        tratamiento_medico_input = input("¿Se encuentra o encontraba en algún tratamiento médico? ")
        alergia_input = input("¿Usted padece algún tipo de alergia? ")
        otros_albergues_input = input("En su trayecto por México, ¿Usted se ha estado en algún otro albergue? ")
        acceso_casaMonarca_input = input("¿Se le brindó acceso al albergue de Casa Monarca? ")
        servicios_ofrecidos_input = input("¿Cuáles servicios se le brindaron a la persona? ")
        señas_input = input("Señas.")
        contacto_emergencia_input = input("Contacto de emergencia ")
        ubicacion_contacto_emergencia_input = input("Geográficamente, ¿Dónde se encuentra su contacto de emergencia? ")
        observaciones_finales_input = input("Observaciones_finales: ")

        column_names = ("nombre","tipo_poblacion","demografia","numero_telefonico","sexo","fecha_nacimiento","pais_origen","departamento_estado","estado_civil","documento_identidad","hijos","alfabetismo","grado_estudio",
                    "idioma","fecha_salida","acompañantes_viaje","estado_viaje","razon_viaje","abuso_extranjero","abuso_nacional","pago_guia","fecha_ingreso","lugar_ingreso","destino_final","red_apoyo","intento_ingreso_eua",
                    "red_apoyo_eua","descripcion_red_apoyo_eua","estacion_migratoria","denuncia","regresar_pais_origen","enfermedad","tratamiento_medico","alergia","otros_albergues","acceso_casaMonarca","servicios_ofrecidos",
                    "señas","contacto_emergencia","ubicacion_contacto_emergencia","observaciones_finales")
        

        #Insertar datos
        user_data = (nombre_input,tipo_poblacion_input,demografia_input,numero_telefonico_input,sexo_input,fecha_nacimiento_input,pais_origen_input,
                        departamento_estado_input,estado_civil_input,documento_identidad_input,hijos_input,alfabetismo_input,grado_estudio_input, idioma_input,
                        fecha_salida_input,acompañantes_viaje_input,estado_viaje_input,razon_viaje_input,abuso_extranjero_input,abuso_nacional_input,pago_guia_input,fecha_ingreso_input,lugar_ingreso_input,
                        destino_final_input,red_apoyo_input,intento_ingreso_eua_input,red_apoyo_eua_input,descripcion_red_apoyo_eua_input,estacion_migratoria_input,denuncia_input,regresar_pais_origen_input,
                        enfermedad_input,tratamiento_medico_input,alergia_input,otros_albergues_input,acceso_casaMonarca_input,servicios_ofrecidos_input,señas_input,contacto_emergencia_input,ubicacion_contacto_emergencia_input,
                        observaciones_finales_input)
        insert_encrypt_data("migrantes",column_names,user_data,key)

    except:
        print("Error al guardar los datos. Intenta otra vez")
        return []