from flask import Flask
from flask_db2 import DB2
import ibm_db
from flask_jwt_extended import JWTManager

app = Flask(__name__)
db = DB2(app)

app.config['DB2_DATABASE'] = 'BLUDB'
app.config['DB2_HOSTNAME'] = 'dashdb-txn-sbox-yp-lon02-06.services.eu-gb.bluemix.net'
app.config['DB2_PORT'] = 50000
app.config['DB2_PROTOCOL'] = 'TCPIP'
app.config['DB2_USER'] = 'qkx97621'
app.config['DB2_PASSWORD'] = 't3z9qt58pt1f-j9q'
app.config['JWT_SECRET_KEY'] = 'secret'

import flaskinventory.login
import flaskinventory.mealpredict
import flaskinventory.addmeal
import flaskinventory.stockpredict
import flaskinventory.stockpredictfetch