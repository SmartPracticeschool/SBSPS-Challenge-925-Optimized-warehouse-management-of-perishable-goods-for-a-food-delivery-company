import React from 'react';
import Tableau from 'tableau-react'


class CurrentTrend extends React.Component{
    render(){
        return(
            <div className="App">
                <h1>This is the current trend of food sales</h1>
                  <Tableau url="https://public.tableau.com/views/Book1_15921306366510/WeekVSCuisine?:display_count=y&publish=yes&:origin=viz_share_link"/>
            </div>
        )
    }
}
export default CurrentTrend
