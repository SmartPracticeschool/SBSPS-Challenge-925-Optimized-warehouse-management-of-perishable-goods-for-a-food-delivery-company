from flask import Flask, request, jsonify, render_template, session
import pandas as pd
import numpy as np
import joblib as jl
from flask_db2 import DB2
import ibm_db
from stldecompose.forecast_funcs import (naive, drift, mean,seasonal_naive)

from flaskinventory import app

app.secret_key = 'any random string'  #for session
db = DB2(app)

with app.app_context():
  cur = db.connection.cursor()
  cur.execute("SELECT * FROM quant")
  Quantity1 = pd.DataFrame(cur)
  cur.execute("SELECT * FROM meal_data")
  meal_info1 = pd.DataFrame(cur)
  cur.execute("SELECT * FROM raw_materials")
  RawNames = pd.DataFrame(cur)
  cur.execute("select meal_id from meal_data where model='ETS'")
  ETS=pd.DataFrame(cur)
  ETS=ETS[0].to_list()
  cur.execute("select meal_id from meal_data where model='STL'")
  STL=pd.DataFrame(cur)
  STL=STL[0].to_list()

totalMeals=meal_info1[0].unique().tolist() 
Meals=meal_info1[1].unique().tolist() 

Quantity=Quantity1.set_index(0) 


def ValuePredictor(to_predict_list): 
  to_predict = np.array(to_predict_list).reshape(1, 2) 
  meal_name=to_predict[0][0]
  for i in range(len(Meals)):
    if Meals[i]==meal_name:
      break

  Mid=int(totalMeals[i])
  week=to_predict[0][1]
  week=int(week)
  Ingredients = RawNames[0].unique().tolist()

  present=0
  Raw=[]

  try:
    #If STL model is better
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
          for q in range(1,len(RawMat)+1): 
            rw=int(round(Pred[p]*RawMat[q]))
            qt.append(rw)
          Raw.append(qt)
        break
    
    #If ETS model is better
    for e in ETS:
        if(Mid==e):
            FName="flaskinventory\models\ETS"+str(Mid)+".xml"
            model = jl.load(FName)
            Pred=[]
            Pred=model.forecast(week) 
            Pred=Pred.tolist()
            print("Type", type(Pred))
            RawMat=Quantity.loc[Mid]
            for p in range(0,len(Pred)):
                qt='Week%s' % p
                qt=[]
              #for q in range(0,len(RawMat))
                for q in range(1,len(RawMat)+1): 
                  rw=round(Pred[p]*RawMat[q])
                  qt.append(rw)
                Raw.append(qt)
            break

  except Exception as e:
      print("Exception",e)
      Prediction="No prediction"
      RawMaterials="No raw materials prediction"

  else:
    #Calculation of Cycle, safety stock and reorder point
    sumi=0

    for i in range(0,len(Pred)):
      sumi=Pred[i]+sumi

    Predicted=int(round(sumi))
    Raw=np.array(Raw)
    res = np.sum(Raw, 0) 
    #Raw=pd.DataFrame
    Prediction=Predicted
    RawMaterials=res

    leadTime=[1,1,1,1,1,1,2,1,1,1,1,1,4,3,3,1,1]
    len(leadTime)

    maxlead=max(leadTime)
    #print(maxlead)

    avglead=mean(leadTime)
    avglead=round(avglead,1)
    #print(avglead)

    RawSafe=Raw.transpose()
    p=len(RawSafe)
    #print(len(RawSafe))
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
    

  return Prediction,RawMaterials, SafetyStock,ReorderPoint,Ingredients, Pred, Mid, week

@app.route('/dropdown', methods=['GET'])
def dropdown():
  return {"meals":Meals}

@app.route('/input', methods=['POST'])
def input():
    data = request.get_json()
    to_predict_list = list(data.values()) 
    Predicted,PredRaw, Safety, ReorderPoint, Ingredients, Orders, Mid, Week = ValuePredictor(to_predict_list)  
    PredRaw=PredRaw.tolist() 
    session['pred']=Predicted
    session['safe']=Safety
    session['predRaw']=PredRaw 
    session['reorder']=ReorderPoint
    session['ingred']= Ingredients
    session['orders']=Orders
    session['mealId']=Mid
    session['week']=Week
    return "OK Done"
    
@app.route('/result', methods = ['GET']) 
def result(): 
  Pred = session.get('pred', None)
  Safe = session.get('safe', None)
  PredRaw = session.get('predRaw', None)
  Reorder = session.get('reorder', None)
  Ingredients = session.get('ingred', None)
  Orders = session.get('orders', None)
  MealID = session.get('mealId', None)
  Week= session.get('week', None)

  cyclelist=[]
  for i in range(len(Ingredients)): 
      res={} 
      res['label'] = Ingredients[i] 
      res['y']=PredRaw[i]
      cyclelist.append(res)

  safetylist=[]
  for i in range(len(Ingredients)): 
      res={} 
      res['label'] = Ingredients[i] 
      res['y']=Safe[i]
      safetylist.append(res)

  reorderlist=[]
  for i in range(len(Ingredients)): 
      res={} 
      res['label'] = Ingredients[i] 
      res['y']=Reorder[i]
      reorderlist.append(res)

  orderlist=[]
  for i in range(len(Orders)): 
      res={} 
      res['x'] = i+1 
      res['y']=Orders[i]
      orderlist.append(res)

  l=[]
  l.append(Pred)
  l.append(Ingredients)
  l.append(orderlist)
  l.append(cyclelist)
  l.append(safetylist)
  l.append(reorderlist)
  l.append(MealID)
  l.append(Week)
  return {"data":l}
    