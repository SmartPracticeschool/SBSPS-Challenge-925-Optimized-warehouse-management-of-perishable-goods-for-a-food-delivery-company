import React from 'react';
import jwt_decode from 'jwt-decode'


class Homepage extends React.Component{
    constructor() {
        super()
        this.state = {
          name: '',
          address: '',
          email: '',
          errors: {}
        }
      }
    
      componentDidMount() {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        this.setState({
          name: decoded.identity.name,
          address: decoded.identity.address,
          email: decoded.identity.email
        })
      } 

    render(){

        return(
            <div className="App-header">
                <div className="container">
                    <div className="jumbotron mt-5">
                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center">PROFILE</h1>
                    </div>
                    <table className="table col-md-6 mx-auto">
                        <tbody>
                        <tr>
                            <td>Restaurant Name</td>
                            <td>{this.state.name}</td>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <td>{this.state.address}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{this.state.email}</td>
                        </tr>
                        </tbody>
                    </table>
                    </div>
                </div>
                <header className="App-left">
                    <h2>Welcome to the Optimised Warehouse Management</h2>
                </header>
                <p className="App-left">You can view the inventory, current trend of sales, raw materials available and suggestions!!</p>
                <p className="App-left"> Click on the tabs to view :)</p>
            </div>
        )
    }
}

export default Homepage
