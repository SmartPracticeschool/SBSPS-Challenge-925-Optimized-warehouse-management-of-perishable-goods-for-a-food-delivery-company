import React, { Component } from 'react'
import { register } from './UserFunctions'
import * as EmailValidator from 'email-validator';
import swal from 'sweetalert';
import './register.css'

class Register extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      address: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit(e) {
    e.preventDefault()
    const newUser = {
      name: this.state.name,
      address: this.state.address,
      email: this.state.email,
      password: this.state.password,   
    }
    const password = this.state.password;
    const confirmPassword = this.state.confirmPassword;
    // perform all neccassary validations

    if ((EmailValidator.validate(this.state.email))!== true){
        swal("Invalid email ID");
    }
     else if (password !== confirmPassword) {
      swal("Passwords don't match");
    } 
    else {       
      register(newUser).then(res => {
        this.props.history.push(`/login`)
      })
    }



  }

  render() {
    return (
      <div className="container">
        <div className="register-form">
          <div className="col-md-10 mt-10 mx-auto">
                    <form noValidate onSubmit={this.onSubmit}>
                        <div className="form-group">
              <h1 className="h1 mb-3 font-weight-normal"><font face="Chelsea Market">Register</font></h1>
              
                <label htmlFor="name">Restaurant name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Enter your restaurant's name"
                  value={this.state.name}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Address</label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  placeholder="Enter address"
                  value={this.state.address}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Enter Password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword"> Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={this.state.confirmPassword}
                  onChange={this.onChange}
                />
              </div>
              <button
                type="submit"
                className="register-form button"
              >
                Register!
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Register