import React from 'react';

class Homepage extends React.Component{
    render(){
        return(
            <div className="App-header">
                <header className="App-left">
                    <h2>Welcome to the Visualisation Menu</h2>
                </header>
                <p className="App-left">You can view the current trends of sales, raw materials available and suggestions!!</p>
                <p className="App-left"> Click on the tabs to view :)</p>
            </div>
        )
    }
}

export default Homepage