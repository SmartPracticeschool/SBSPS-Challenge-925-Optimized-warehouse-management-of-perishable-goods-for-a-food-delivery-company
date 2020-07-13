import React from 'react';
import swal from 'sweetalert'
import './inventory.css'

class Suggestions extends React.Component{
    componentDidMount() {
        if (!localStorage["usertoken"]) {

            swal("Please Login")
            this.props.history.push(`/login`)
        }       
    } 
    render(){
        return(
            <div className="App">
     
                <header className="inventory-text">
                <h1 >Page under construction...</h1>
                </header>
                <h3 className="inventory-text">Future enhancements </h3>
                <br></br>
                <h5 className="inventory-text">
                1) Live Inventory Management 
                <br></br>       -Current Stock Dashboard <br></br>           -Daily Stock Update 
                </h5>
                <br></br>
                <h5 className="inventory-text">
                2) Suggestions for Dishes based on Current Stock Availability
                </h5>
            </div>
        )
    }
}

export default Suggestions