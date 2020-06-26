import React from 'react';
import { MealWiseInput } from '../StockPrediction/mealWiseInput';

class Homepage extends React.Component{
    

    render(){

        return(
            <div className="App-header">
                <header className="App-left">
                    <h2>Welcome to the Optimised Warehouse Management</h2>
                </header>
                <p className="App-left">You can view the inventory, current trend of sales, raw materials available and suggestions!!</p>
                <p className="App-left"> Click on the tabs to view :)</p>
                <MealWiseInput/>
            </div>
        )
    }
}

export default Homepage
