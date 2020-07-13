import React, { Component } from 'react'
import { login } from './UserFunctions'
import {Link} from 'react-router-dom'
import './login.css'
import swal from 'sweetalert'
import logo from './bonnn.png'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
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

    const user = {
      email: this.state.email,
      password: this.state.password
    }

    login(user).then(res => {
      if (!res.error) {
        this.props.history.push(`/nav/main`)
      }
      else{
        swal("Invalid username or password")
      }
    })
  }

  render() {
      return (

          <div className="cen1">

      <div className="container">
                  <div className="login-form">
                  <img src={logo} alt="Logo" style={{width:270, height:150, marginLeft:"50px"}}/>
              <br></br>
              <br></br>
          <div className="col-md-10 mt-10 mx-auto">
                          <form noValidate onSubmit={this.onSubmit}>
              <div className="form-group">

             <h1 className="h1 mb-3 font-weight-normal"><font face="Chelsea Market">Login</font></h1>

              <h5><font color="#000000" ><label htmlFor="email">Email address</label></font></h5>
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
              <h5><font color="#000000" ><label htmlFor="password">Password</label></font></h5>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </div>
              <button
                type="submit"
                className="login-form button"
              >Login</button>

                              <div className="cen2">
         <h5><font color="#000000" face="Chelsea Market">

Not a member? <Link to='/register' style={{ color: '#262F5F' }} >Sign up</Link>
            </font>
                                  </h5>
              
              </div>
            </form>
          </div>
        </div>
      </div>
	  </div>
    )
  }
}

export default Login
