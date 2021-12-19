import json
import db

query = "update tblemail set email=%s, isactive=%s " \
    "where emailid=11"
args = ("syafria@gmail.com", 0)
result = db.executeData(query, args)
print(result)