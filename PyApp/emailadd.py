import json
import db
import sys

query = "INSERT INTO tblemail(Email,IsActive,Created) " \
    "VALUES(%s,%s,now())"
#args = ("syafri@gmail.com", 1)
args = (sys.argv[1], 1)
result = db.executeData(query, args)
print(result)