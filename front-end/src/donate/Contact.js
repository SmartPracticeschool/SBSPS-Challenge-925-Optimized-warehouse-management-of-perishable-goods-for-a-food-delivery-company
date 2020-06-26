import React, { Component } from "react";
import Linkify from 'react-linkify';
import './googleAPI'
import Map from "./mapApp";
 

 
class Contact extends Component {
  render() {
    return (
      <div>
        <p>Below is the link where you can enter your region and locate the nearest NGOs.</p>
        <Linkify component='button' properties={{onClick: function onClick() { alert( 'Success!'); }}}>
        https://www.wango.org/resources.aspx?section=ngodir#tab2</Linkify>
        <Map/>
        
 
        
      </div>
    );
  }
}

 
export default Contact;