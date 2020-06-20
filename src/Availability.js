import React from 'react';
import Tableau from 'tableau-react'

class Availability extends React.Component{
    render(){
        return(
            <div className="App">
                <h1>This is the current Availability of raw materials</h1>
                <Tableau url='https://public.tableau.com/views/Product_expiry/Sheet1?:language=en&:display_count=y&publish=yes&:origin=viz_share_link'/>
            </div>
        )
    }
}

export default Availability