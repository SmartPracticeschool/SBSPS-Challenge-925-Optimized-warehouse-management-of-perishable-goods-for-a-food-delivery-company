from flask import Flask, jsonify
import pandas as pd
from flask_db2 import DB2
import ibm_db

from flaskinventory import app

db = DB2(app)

@app.route('/fetch', methods=['GET'])
def fetchc():
    cur = db.connection.cursor()
    cur.execute("SELECT * FROM raw_materials")
    RawNames = pd.DataFrame(cur)
    ingredient = RawNames[0].unique().tolist()
    cycle=[]
    for i in range(len(ingredient)):
        cur.execute("select sum("+ingredient[i]+") from cyclestock")
        val = pd.DataFrame(cur)
        val=val[0].unique().tolist()
        cycle.append(val[0])

    cyclelist=[]
    for i in range(len(ingredient)): 
        res={} 
        res['label'] = ingredient[i] 
        res['y']=cycle[i]
        cyclelist.append(res)

    print("Cycle stock received")

    safety=[]
    for i in range(len(ingredient)):
        cur.execute("select sum("+ingredient[i]+") from safetystock")
        val = pd.DataFrame(cur)
        val=val[0].unique().tolist()
        safety.append(val[0])
    
    safetylist=[]
    for i in range(len(ingredient)): 
        res={} 
        res['label'] = ingredient[i] 
        res['y']=safety[i]
        safetylist.append(res)

    print("Safety stock received")

    reorder=[]
    for i in range(len(ingredient)):
        cur.execute("select sum("+ingredient[i]+") from reorderpoint")
        val = pd.DataFrame(cur)
        val=val[0].unique().tolist()
        reorder.append(val[0])
    
    reorderlist=[]
    for i in range(len(ingredient)): 
        res={} 
        res['label'] = ingredient[i] 
        res['y']=reorder[i]
        reorderlist.append(res)

    print("Reorder point received")

    l=[]
    l.append(safetylist)
    l.append(cyclelist)
    l.append(reorderlist)
    return {"data":l}