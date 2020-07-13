import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login/Login'
import Register from './Login/Register'
import SideNav from './Homepage/SideNavigation';
//import trend from './visualisation/currentTrend'
import inventory from './Inventory/Inventory'
//import avail from './visualisation/Availability'
import Homepage from './Homepage/Homepage'
import donateHome from './donate/donateHome'
import addMeal from './add_meal/addMeal'
import Stock from './StockPrediction/stockPredict'
import MealPage from './StockPrediction/mealPage'
import MealList from './StockPrediction/mealList'


class App extends React.Component{
    render(){
        return(
            <div>
            <Router>
                <div className="App">
                <div className="container">
                    <Route exact path="/" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                </div>
                </div>
                <Route path="/nav" component={SideNav} />
                <Route exact path="/nav/main" component={Homepage} />
                <Route exact path="/nav/inventory" component={inventory}/>
                <Route exact path="/nav/add_meal" component={addMeal}/>
                <Route exact path="/nav/stock" component={Stock}/>
                <Route exact path="/nav/donations" component={donateHome}/>
                <Route path="/nav/form" component={MealPage}/>
                <Route exact path="/nav/form/retrieve" component={MealList}/>
            </Router>
            </div>
        );
    }
}

export default App;