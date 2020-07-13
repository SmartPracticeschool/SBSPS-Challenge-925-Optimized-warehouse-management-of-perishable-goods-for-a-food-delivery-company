import React, { Component } from "react";
import './donate.css'

import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";

import Home from "./Home";
import Contact from "./Contact";
import swal from 'sweetalert'
 
class DonateHome extends Component {
  componentDidMount() {
    if (!localStorage["usertoken"]) {

        swal("Please Login")
        this.props.history.push(`/login`)
    }       
  } 
  render() {
    return (
      <HashRouter>
        <div>
          <h1 className="donate-text" >Donate the excess</h1>
          <ul className="header">
          <li><NavLink exact to="/">Home</NavLink></li>

          <li><NavLink to="/contact">Contact</NavLink></li>

            
            
          </ul>

          <div className="content">
            <Route exact path="/" component={Home}/>
 
  <Route path="/contact" component={Contact}/>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default DonateHome