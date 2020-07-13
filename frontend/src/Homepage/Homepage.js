import React from 'react';
import jwt_decode from 'jwt-decode'
import swal from 'sweetalert'
import './homepage.css'

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
            <div>
                <header className="homepage-text">
                    <h2>Welcome to Bon Appétit - An Optimised Warehouse Management System!</h2>
                </header>
                <div className="container">
                    <div className="homepage-form">
                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center">PROFILE</h1>
                    </div>
                    <table className="table col-md-6 mx-auto">
                        <tbody className="profile-text">
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

                <p className="homepage-text">You can add a dish, view the sales & stock predictions or donate food!!</p>
                <p className="homepage-text"> Click on the tabs to view :)</p>
            </div>
        )
    }
}

export default Homepage
