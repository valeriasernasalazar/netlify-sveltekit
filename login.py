import psycopg2
import psycopg2.extras
from config import config
import pandas as pd
from dotenv import load_dotenv
from f_decoding import decoding_ 
from f_encoding import encoding_
from tabulate import tabulate


#Connect to the database
def get_db_connection():

    try:
        params =  config(section="DB5")
        connection = psycopg2.connect(**params)

        return (connection,params)
    except Exception as e:
        print("An error occurred while connecting to the database:", e)
        return None



def check_login_user_credentials(username,input_password,key):

    conn,conn_params = get_db_connection()

    if conn is not None:

        try:

            cur = conn.cursor()

            cur.execute("SELECT encrypted_password FROM logins WHERE username = %s",(username,)) 
            result = cur.fetchone() #seleccionamos la contraseña encriptada

            if result:
                encrypted_password = result[0]

                decrypted_password = decoding_(key,encrypted_password).decode('utf-8')

                if decrypted_password == input_password:
                    return True
                else:
                    print(f'Password does not match with the user')
                    return False


            
            else:
                print("No user found with that username.")
                return False
            

        except Exception as e:
            print("An error occurred:", e)
            conn.rollback()  # Rollback the transaction on error
        finally:
        # Close the database connection
            cur.close()
            conn.close()
    else:
        print("Failed to connect to database") 
        

def insert_login_user_credentials(input_username,input_password,key):

    conn,conn_params = get_db_connection()

    if conn is not None:

        try:
            cur = conn.cursor()
            encrypted_input_password = encoding_(key, input_password,lower=False)
            cur.execute("INSERT INTO logins (username, encrypted_password) VALUES (%s,%s)",(input_username,encrypted_input_password))
            conn.commit() #Save changes
            print("Login credentials registered succesfully.")

        except Exception as e:
            print("An error occurred:", e)
            conn.rollback()  # Rollback the transaction on error
        finally:
        # Close the database connection
            cur.close()
            conn.close()
    else:
        print("Failed to connect to database") 

def login(key):

    print("Bienvenido, favor de ingresar")
    while True:
        user = input("Ingrese su usuario: ")
        passw = input("Ingrese su contraseña: ")

        signedIn = check_login_user_credentials(user, passw,key)
        if signedIn:
            return user
            break
        else:
            trying_again = input("¿Volver a intentar? y/n: ")
            if trying_again == "n":
                return False
                break
            elif trying_again == "y":
                print("Intente otra vez\n")
            else:
                print("Respuesta inválida\n")