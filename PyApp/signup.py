import sys
import json
import db

email = sys.argv[1]
#email = "s@gmail.com"

#password = sys.argv[2]
#print('hello: ' + email)
#print('password is: ' + password)

def createEmail():
  rows = db.getData("SELECT * FROM tblemail where Email='" + email + "'")
  if not rows:
      query = "INSERT INTO tblemail(Email,IsActive,Created) " \
        "VALUES(%s,%s,now())"
      args = (email, 1)
      crud = db.executeData(query, args)
      emailValue = "Successfully sign up."
  else:
      emailValue = "Error: email already exist. Please add a new one."
  
  result = {
    "Email": emailValue
  }

  return json.dumps(result)

print(createEmail())


