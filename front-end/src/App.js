import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import './App.css';
import SideNav from './Homepage/SideNavigation';
import trend from './visualisation/currentTrend'
import suggestions from './visualisation/Suggestions'
import avail from './visualisation/Availability'
import Homepage from './Homepage/Homepage'
import donateHome from './donate/donateHome'
import addMeal from './add_meal/addMealHome'
import Stock from './StockPrediction/stockPredict'
import mealWise from './StockPrediction/mealPage'
//import mealInput from './StockPrediction/mealWiseInput'


class App extends React.Component{
    render(){
        return(
            <div>
            <Router>
                <Route path="/" component={SideNav} />
                <Route exact path="/main" component={Homepage} />
                <Route exact path="/current_trend" component={trend} />
                <Route exact path="/availability" component={avail}/>
                <Route exact path="/suggestions" component={suggestions}/>
                <Route exact path="/add_meal" component={addMeal}/>
                <Route exact path="/stock" component={Stock}/>
                <Route exact path="/donations" component={donateHome}/>
                <Route exact path="/meal-wise" component={mealWise}/>
            </Router>
            </div>
        );
    }
}

export default App;