import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="Adi@4321",
  database="pyapp",
  auth_plugin='mysql_native_password'
)

def getData(query):
    mycursor = mydb.cursor()
    mycursor.execute(query)
    rows = mycursor.fetchall()

    return rows

def executeData(query, args):
    mycursor = mydb.cursor()
    mycursor.execute(query, args)
    mydb.commit()
    return 1