import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import trend from './currentTrend'
import suggestions from './Suggestions'
import avail from './Availability'
import Homepage from './Homepage'
import donateHome from './donate/donateHome'
import addMeal from './add_meal/addMealHome'
import Inventory from './inventory/inventoryHome'

const routing= (
  <div>
  <Router>
    <Route path="/" component={App}/>
    <Route exact path="/" component={Homepage} />
    <Route exact path="/current_trend" component={trend} />
    <Route exact path="/availability" component={avail}/>
    <Route exact path="/suggestions" component={suggestions}/>
    <Route exact path="/add_meal" component={addMeal}/>
    <Route exact path="/inventory" component={Inventory}/>
    <Route exact path="/donations" component={donateHome}/>

  </Router>
  </div>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
