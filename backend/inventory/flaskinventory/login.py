from flask import Flask, request, jsonify, render_template,json
from datetime import datetime
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_db2 import DB2
from flask_jwt_extended import JWTManager
from flask_jwt_extended import (create_access_token)
import ibm_db
from flaskinventory import app
import pandas as pd

db = DB2(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
CORS(app)

@app.route('/users/register', methods=['POST'])
def register():
    cur = db.connection.cursor()
    name = request.get_json()['name']
    address = request.get_json()['address']
    email = request.get_json()['email']
    password = bcrypt.generate_password_hash(request.get_json()['password']).decode('utf-8')
    #created = datetime.utcnow()
	
    cur.execute("INSERT INTO users (name, address, email, password) VALUES (?,?,?,?)", (str(name),str(address),str(email),str(password),))

    db.connection.commit()
	
    result = {
		'name' : name,
		'address' : address,
		'email' : email,
		'password' : password
		#'created' : created
	}

    return jsonify({'result' : result})
	

@app.route('/users/login', methods=['POST'])
def login():
    cur = db.connection.cursor()
    email = request.get_json()['email']
    password = request.get_json()['password']
    result = ""
	
    cur.execute("SELECT * FROM users where email = '" + str(email) + "'")
    rv = cur.fetchone()
    if rv==None:
        #print("Not found")
        result = {"error":"Invalid username and password"}  
        return result
	
    if bcrypt.check_password_hash(rv[3], password):
        access_token = create_access_token(identity = {'name': rv[0],'address': rv[1],'email': rv[2]})
        result = access_token
        #print("found")
    else:
        result = {"error":"Invalid username and password"}
        #print("not found pass")
    
    return result
	
if __name__ == '__main__':
    app.run(debug=True)