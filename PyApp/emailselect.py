import sys
import json
import db

email = sys.argv[1]
#password = sys.argv[2]
#print('hello: ' + email)
#print('password is: ' + password)

def getEmail():
  rows = db.getData("SELECT * FROM tblemail where Email='" + email + "'")

  emailValue = ""

  if not rows:
    result = {
    "Email": emailValue
    }
    return json.dumps(result)

  for row in rows:
    emailValue = row[1]
  
  result = {
    "Email": emailValue
  }

  return json.dumps(result)

print(getEmail())