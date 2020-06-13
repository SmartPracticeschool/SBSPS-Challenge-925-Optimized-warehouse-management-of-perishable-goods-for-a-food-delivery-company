import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
<<<<<<< HEAD
import { Route, BrowserRouter as Router } from 'react-router-dom'
import trend from './currentTrend'
import suggestions from './Suggestions'
import avail from './Availability'
import Homepage from './Homepage'

const routing= (
  <div>
  <Router>
    <Route path="/" component={App}/>
    <Route exact path="/" component={Homepage} />
    <Route exact path="/current_trend" component={trend} />
    <Route exact path="/availability" component={avail}/>
    <Route exact path="/suggestions" component={suggestions}/>
  </Router>
  </div>
)

ReactDOM.render(
  routing,
=======

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
>>>>>>> f63c62db11a414cf2818cea210c65fb1861792ac
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
