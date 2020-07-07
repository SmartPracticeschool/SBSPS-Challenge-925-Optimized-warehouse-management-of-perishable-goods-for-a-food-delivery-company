import React from 'react';
import jwt_decode from 'jwt-decode'
import swal from 'sweetalert'

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

        if (!localStorage["usertoken"]) {

            swal("Please Login")
            this.props.history.push(`/login`)
        }
        else {
            const token = localStorage.usertoken
            const decoded = jwt_decode(token)
            this.setState({
          name: decoded.identity.name,
          address: decoded.identity.address,
          email: decoded.identity.email
        })
        }
      } 

    render(){

        return(
            <div className="App-header">
                <header>
                    <h2>Welcome to the Optimised Warehouse Management</h2>
                </header>
                <div className="container">
                    <div className="form">
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

                <p className="App-left">You can add a dish, view the sales & stock predictions or donate food!!</p>
                <p className="App-left"> Click on the tabs to view :)</p>
            </div>
        )
    }
}

export default Homepage
