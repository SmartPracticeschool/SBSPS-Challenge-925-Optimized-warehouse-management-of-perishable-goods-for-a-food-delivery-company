import React from "react";
import { MealWiseInput } from "./mealWiseInput";
import { Container } from "semantic-ui-react";

class MealPage extends React.Component {

    state = {
        loading:true,
        predicted:null,
    }

    async componentDidMount(){
    //this._ismounted = true;
    const url = "/input"; 
    const response =await fetch(url);
    const data= await response.json()
    this.setState({ predicted: data.prediction , loading: false });
    console.log(data.prediction)
    }


    render(){
        return (
            <Container style={{ marginTop: 40 }}>
                <MealWiseInput/>
                <div>{this.state.predicted}</div>
            </Container>
        );
    }
}

export default MealPage;
