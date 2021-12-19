import sys
import db

email = sys.argv[1]
token = sys.argv[2]
#id = 1
#token = 123456

def createToken():
    query = "update tblemailtoken set isactive=%s " \
        "where email=%s"
    args = (0, email)
    crud = db.executeData(query, args)
    query = "INSERT INTO tblemailtoken(email,token,IsActive,Created) " \
        "VALUES(%s,%s,%s,now())"
    args = (email, token, 1)
    crud = db.executeData(query, args)
    return "Token inserted"

print(createToken())