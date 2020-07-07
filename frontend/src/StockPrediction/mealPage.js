import React, { Component } from 'react';

import { Route, BrowserRouter as Router } from 'react-router-dom'
//import './App.css';
import MealList from './mealList';
import MealForm from './mealForm';
import swal from 'sweetalert'

class MealPage extends Component {
    componentDidMount() {
        if (!localStorage["usertoken"]) {
    
            swal("Please Login")
            this.props.history.push(`/login`)
        }       
      } 
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