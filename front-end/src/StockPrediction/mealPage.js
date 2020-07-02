import React, { Component } from 'react';

import { Route, BrowserRouter as Router } from 'react-router-dom'
//import './App.css';
import MealList from './mealList';
import MealForm from './mealForm';

class MealPage extends Component {
    render(){
        return (

            <div>
            
                <MealForm/>
                <Router>
                    <Route exact path="/retrieve" component={MealList} />
                </Router>
            </div>
        )
    }
}

export default MealPage;