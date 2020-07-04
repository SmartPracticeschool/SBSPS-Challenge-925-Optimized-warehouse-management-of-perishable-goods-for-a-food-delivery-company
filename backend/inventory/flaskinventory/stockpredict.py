from flask import Flask
import pandas as pd
import numpy as np
import joblib as jl
from flask_db2 import DB2
import ibm_db
from stldecompose.forecast_funcs import (naive, drift, mean,seasonal_naive)

from flaskinventory import app

db = DB2(app)

@app.route('/home', methods=['GET'])
def home():
    cur = db.connection.cursor()
    print('connected')
    cur.execute("SELECT * FROM quant")
    Quantity1 = pd.DataFrame(cur)
    cur.execute("SELECT * FROM meal_info")
    meal_info1 = pd.DataFrame(cur)
    cur.execute("SELECT * FROM raw_materials")
    RawNames = pd.DataFrame(cur)
    cur.execute("select meal_id from meal_info where model='ETS'")
    ETS=pd.DataFrame(cur)
    ETS=ETS[0].unique().tolist()
    cur.execute("select meal_id from meal_info where model='STL'")
    STL=pd.DataFrame(cur)
    STL=STL[0].unique().tolist()
    print("ETS",ETS)
    print("STL",STL)
  
    totalMeals=meal_info1[0].unique()   #changed for db
    Quantity=Quantity1.set_index(0)  #changed for db

    for meal in totalMeals:
        Mid=meal
        Mid=int(Mid)
        week=10
        week=int(week)
        Ingredients = RawNames[0].unique().tolist()

        present=0
        Raw=[]

        try:
            for s in STL:
                if(Mid==s):
                    from stldecompose import decompose, forecast
                    FName="flaskinventory\models\STL"+str(Mid)+".xml"
                    model = jl.load(FName)
                    fore=forecast(model, steps=week, fc_func=naive, seasonal=True) 
                    Pred=[]
                    for j in fore.values:
                        Pred.append(j[0])
                    RawMat=Quantity.loc[Mid]
                    for p in range(0,len(Pred)):
                        qt='Week%s' % p
                        qt=[]
                        for q in range(1,len(RawMat)+1):  #had to change for db
                            rw=int(round(Pred[p]*RawMat[q]))
                            qt.append(rw)
                        Raw.append(qt)
                    break

            for e in ETS:
                if(Mid==e):
                    FName="flaskinventory\models\ETS"+str(Mid)+".xml"
                    model = jl.load(FName)
                    Pred=[]
                    Pred=model.forecast(week) 
                    RawMat=Quantity.loc[Mid]
                    for p in range(0,len(Pred)):
                        qt='Week%s' % p
                        qt=[]
                        for q in range(1,len(RawMat)+1):    #had to change for db
                            rw=int(round(Pred[p]*RawMat[q]))
                            qt.append(rw)
                        Raw.append(qt)
                    break

        except Exception as e:
            print("Exception",e)
            Prediction="No prediction"
            RawMaterials="No raw materials prediction"

        else:
            sumi=0

            for i in range(0,len(Pred)):
                sumi=Pred[i]+sumi

            Predicted=int(round(sumi))
            Raw=np.array(Raw)
            res = np.sum(Raw, 0) 
            Prediction=Predicted
            RawMaterials=res.tolist()

            leadTime=[1,1,1,1,1,1,2,1,1,1,1,1,4,3,3,1,1]
            len(leadTime)

            maxlead=max(leadTime)

            avglead=mean(leadTime)
            avglead=round(avglead,1)

            RawSafe=Raw.transpose()
            p=len(RawSafe)
            SafetyStock=[]
            t=[]
            R=[]
            ReorderPoint=[]

            for j in range(0,p):
                maxt=0
                avgt=0
                Safety=0
                ld=0
                Reorder=0
                t=RawSafe[j]
                maxt=max(t)
                avgt=round(mean(t),2)
                Safety=round(((maxt*maxlead)-(avgt*avglead)),2)
                SafetyStock.append(Safety)
                ld=round((leadTime[j]*avgt),2)
                Reorder=round((ld+Safety),2)
                ReorderPoint.append(Reorder)
            print('Done')


        #Adding cycle stock to DB
        #cur.execute("call sysproc.admin_cmd('reorg table QKX97621.CYCLESTOCK')")
        cur.execute("SELECT * FROM cyclestock WHERE meal_id = ?",(Mid,))
        
        df = pd.DataFrame(cur)
        if df.empty:
            print("Does not exist")
            cur.execute("insert into cyclestock (meal_id) values (?)",(Mid,))
            print("hello")
        else:
            print('Meal ID already added!')

        for i in range(len(Ingredients)):
            try:
                q="update cyclestock set "+Ingredients[i]+" = ? where meal_id=?"
                cur.execute(q,(RawMaterials[i],Mid,))
            except:          
                q1="ALTER TABLE cyclestock ADD "+Ingredients[i]+" INTEGER"
                cur.execute(q1)
                q2="update cyclestock set "+Ingredients[i]+" = ? where meal_id=?"
                cur.execute(q2,(RawMaterials[i],Mid,))
        cur.execute("SELECT * FROM cyclestock WHERE meal_id = ?",(Mid,))
        df2 = pd.DataFrame(cur)
        print(df2)

        #Adding safety stock
        #cur.execute("call sysproc.admin_cmd('reorg table QKX97621.SAFETYSTOCK')")
        cur.execute("SELECT * FROM safetystock WHERE meal_id = ?",(Mid,))
        
        df = pd.DataFrame(cur)
        if df.empty:
            print("Does not exist")
            cur.execute("insert into safetystock (meal_id) values (?)",(Mid,))
            print("hello")
        else:
            print('Meal ID already added!')

        for i in range(len(Ingredients)):
            try:
                q="update safetystock set "+Ingredients[i]+" = ? where meal_id=?"
                cur.execute(q,(SafetyStock[i],Mid,))
            except:          
                q1="ALTER TABLE safetystock ADD "+Ingredients[i]+" INTEGER"
                cur.execute(q1)
                q2="update safetystock set "+Ingredients[i]+" = ? where meal_id=?"
                cur.execute(q2,(RawMaterials[i],Mid,))
        cur.execute("SELECT * FROM safetystock WHERE meal_id = ?",(Mid,))
        df2 = pd.DataFrame(cur)
        print(df2)

        #Adding reorder point
        #cur.execute("call sysproc.admin_cmd('reorg table QKX97621.REORDERPOINT')")
        cur.execute("SELECT * FROM reorderpoint WHERE meal_id = ?",(Mid,))
        
        df = pd.DataFrame(cur)
        if df.empty:
            print("Does not exist")
            cur.execute("insert into reorderpoint (meal_id) values (?)",(Mid,))
            print("hello")
        else:
            print('Meal ID already added!')

        for i in range(len(Ingredients)):
            try:
                q="update reorderpoint set "+Ingredients[i]+" = ? where meal_id=?"
                cur.execute(q,(ReorderPoint[i],Mid,))
            except:          
                q1="ALTER TABLE reorderpoint ADD "+Ingredients[i]+" INTEGER"
                cur.execute(q1)
                q2="update reorderpoint set "+Ingredients[i]+" = ? where meal_id=?"
                cur.execute(q2,(ReorderPoint[i],Mid,))
        cur.execute("SELECT * FROM reorderpoint WHERE meal_id = ?",(Mid,))
        df2 = pd.DataFrame(cur)
        print(df2)

    return 'Stock prediction Done!'   