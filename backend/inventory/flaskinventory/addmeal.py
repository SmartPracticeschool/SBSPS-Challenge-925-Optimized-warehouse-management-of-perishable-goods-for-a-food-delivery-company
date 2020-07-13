from flask import Flask,  request
import pandas as pd
from flask_db2 import DB2
import ibm_db
from flaskinventory import app

db = DB2(app)

#meal_id=1993
#i_name=['potato','ketchup','parsley','tomato']
#i_quant=[10,20,30,14]


@app.route('/addmeal', methods=['POST'])
def addmeal():
    #conn = ibm_db.connect("BLUDB","qkx97621","t3z9qt58pt1f-j9q")
    print("reached")
    i_name=[]
    i_quant=[]
    meal_id = request.get_json()['meal']
    meal_name = request.get_json()['meal_name']
    meal_id=int(meal_id)
    ingred = request.get_json()['ingred']
    quant = request.get_json()['quant']
    for i in ingred:
        i_name.append(i["value1"])
    for i in quant:
        i_quant.append(int(i["value2"]))
        #i_name.append(i.value1)
        #i_quant.append(quant[i].value2)
    print("Meal id",meal_id)
    print("Ingreds", i_name)
    print("Quants",i_quant)
    
    cur = db.connection.cursor()
    print('connected')
    cur.execute("call sysproc.admin_cmd('reorg table QKX97621.QUANT')")
    cur.execute("SELECT * FROM quant WHERE meal_id = ?",(meal_id,))
    
    df = pd.DataFrame(cur)
    if df.empty:
        print("Does not exist")
        cur.execute("insert into quant (meal_id) values (?)",(meal_id,))
        print("hello")
    else:
        return'Meal ID already added!'
    #print(df)
    #df[2] = [str(r) for r in df[2]]
    #print("count", cur.rowcount)
    for i in range(len(i_name)):
        try:
            q="update quant set "+i_name[i]+" = ? where meal_id=?"
            cur.execute(q,(i_quant[i],meal_id,))
        except:          
            q1="ALTER TABLE quant ADD "+i_name[i]+" INTEGER"
            cur.execute(q1)
            cur.execute("insert into raw_materials (ingredient) values (?)",(i_name[i],))
            q2="update quant set "+i_name[i]+" = ? where meal_id=?"
            cur.execute(q2,(i_quant[i],meal_id,))
    cur.execute("SELECT * FROM quant WHERE meal_id = ?",(meal_id,))
    df2 = pd.DataFrame(cur)
    print(df2)


    #stmt = ibm_db.exec_immediate(conn, "UPDATE quantity SET Potato = 35 WHERE meal_id = 1885")
    print('updated')
    #print ("Number of affected rows: ", ibm_db.num_rows(stmt))
    
    return 'Added Meal'
