import React from 'react';
import Tableau from 'tableau-react'
import swal from 'sweetalert'

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
     
                <header>
                <h1>Page under construction...</h1>
                <Tableau url='https://public.tableau.com/views/Product_expiry/Sheet1?:language=en&:display_count=y&publish=yes&:origin=viz_share_link'/>
                </header>
            </div>
        )
    }
}

export default Suggestions