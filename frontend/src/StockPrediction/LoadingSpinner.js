import React, { Component } from 'react'
import { css } from "@emotion/core";
import FadeLoader from "react-spinners/FadeLoader";
import './stockPredict.css'

class LoadingSpinner extends Component {
    render(){

        const override = css`
  display: block;
  margin: 0 auto 0;
  border-color: red;
`;
        return(
            <div>
                <FadeLoader css={override} color={"#FFFFFF"} height={50} radius={10} margin={60}/>
                <br></br>
                <br></br>
                <br></br>
                <p className="stock-text" style={{fontSize:20, textAlign:'center'}}>The graph is being generated...please wait!</p>

            </div>
        )
    }
}

export default LoadingSpinner;