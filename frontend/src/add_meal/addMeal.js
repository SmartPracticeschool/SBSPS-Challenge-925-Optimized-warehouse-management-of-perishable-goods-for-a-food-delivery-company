import React, { Component } from 'react';
import { Container, Row, Col, Card, CardTitle, CardBody, Button, Form, FormGroup, Label, Input } 
from 'reactstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import swal from 'sweetalert'
import './addmeal.css';


 
class AddMealHome extends Component {
 
    constructor(props) {
        super(props);
        this.defaultIngred = { "id1": "-1", "value1": "" };
        this.defaultQuant = { "id2": "-1", "value2": "" };
        this.state = {
            meal: "",
            meal_name: "",
            ingred: [this.defaultIngred],
            quant: [this.defaultQuant]
        }
    }

    componentDidMount() {
        if (!localStorage["usertoken"]) {

            swal("Please Login")
            this.props.history.push(`/login`)
        }       
    }

    
 
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
        //let { id, value } = e.target;
        //this.setState({ [id]: value })
    }
 
    handleIngredChange = (index, e) => {
        // eslint-disable-next-line 
        const value1  = e.target.value;
        //console.log("lol"+e.target.value)
        //console.log("actual lol"+value1)
        let stateIngredClone = JSON.parse(JSON.stringify(this.state.ingred));
        //console.log("hey hey "+stateIngredClone.value1)
        //stateIngredClone[index].id1 = id1;
        stateIngredClone[index].value1 = value1;
        stateIngredClone[index].id1 = index;
        //console.log("hey hey "+stateIngredClone[index].value1)
        //console.log("id val"+stateIngredClone[index].id1)
        //console.log("hey hey "+stateIngredClone)
        this.setState({ ingred: stateIngredClone });
        console.log(this.state)
    }

    handleQuantChange = (index, e) => {
        // eslint-disable-next-line 
        const value2  = e.target.value;
        console.log(value2)
        let stateQuantClone = JSON.parse(JSON.stringify(this.state.quant));
        //stateQuantClone[index].id2 = id2;
        stateQuantClone[index].value2 = value2;
        stateQuantClone[index].id2 = index;
        this.setState({ quant: stateQuantClone });
        console.log("heya",this.state)
    }
 
    handleSave = (e) => {
        e.preventDefault();
        console.log(this.state)
        //Axios connect here
        axios
            .post('/addmeal', this.state)
            .then(response => {
                console.log(response.data)
                swal(response.data)

                //window.location="/nav/form/retrieve"

            })
            .catch(error => {
                console.log(error)
            })
    }
 
    resetMeal = () => {
        let emptyMeal = "";
        return emptyMeal
    }
    resetMealName = () => {
        let emptyMealName = "";
        return emptyMealName
    }
 
    resetIngred = (vals) => {
        let emptyVals = vals.map(
            (data) => {
                data.id1=-1;
                data.value1 = '';
                return data;
            }
        )
        return emptyVals;
    }
    resetQuant = (vals) => {
        let emptyVals = vals.map(
            (data) => {
                data.id2=-1;
                data.value2 = '';
                return data;
            }
        )
        return emptyVals;
    }
 
    handleReset = (e) => {
        let stateClone = JSON.parse(JSON.stringify(this.state));
        let emptyMeal = this.resetMeal();
        console.log(emptyMeal)
        let emptyIngred = this.resetIngred(stateClone.ingred);
        console.log(emptyIngred)
        let emptyQuant = this.resetQuant(stateClone.quant);
        console.log(emptyQuant)
        let emptyMealName = this.resetMealName(stateClone.meal_name);
        //console.log(emptyQuant)
        this.setState({ meal: emptyMeal, meal_name: emptyMealName, ingred: emptyIngred, quant: emptyQuant });
        console.log(this.state)
        e.preventDefault();
    }
 
    handleDelete = (index, e) => {
        let stateClone = JSON.parse(JSON.stringify(this.state));
        stateClone.ingred.splice(index, 1);
        this.setState({ ingred: stateClone.ingred });
        stateClone.quant.splice(index, 1);
        this.setState({ quant: stateClone.quant });
        e.preventDefault();
    }
 
    handleClick = (e) => {
        let stateClone = JSON.parse(JSON.stringify(this.state));
        stateClone.ingred.push(this.defaultIngred);
        this.setState({ ingred: stateClone.ingred });
        stateClone.quant.push(this.defaultQuant);
        this.setState({ quant: stateClone.quant });
        e.preventDefault();
    }
 
    customRow = (ingred) => {
        const listItems = ingred.map((cusRow, index) =>
            <FormGroup row key={index}>
                <Label for="ingred" sm={7} className="addmeal-text">Ingredient {index + 1}</Label>
                <Col sm={10}>
                    <Input type="text" name="ingred" id="ingred" value={cusRow.value1} 
onChange={(e) => this.handleIngredChange(index, e)} />
                </Col>

 
            </FormGroup>
        );
        return (
            listItems
        )
        
    }

    customRow1 = (quant) => {
        const listItems = quant.map((cusRow, index) =>
            <FormGroup row key={index}>
                <Label for="quant" sm={7} className="addmeal-text">Quantity</Label>
                <Col sm={10}>
                    <Input type="text" name="quant" id="quant" value={cusRow.value2} 
onChange={(e) => this.handleQuantChange(index, e)} />
                </Col>
                <Col sm={1}>
                    <Button color="Success" onClick={(e) => this.handleDelete(index, e)}>X</Button>
                </Col>
 
            </FormGroup>
        );
        return (
            listItems
        )
        
    }
    
 
    render() {
        let { meal, ingred, quant, meal_name } = this.state;
        return (
            <div className="container">
            <div className="form">

            <Container style={{ width: '40rem', justifyContent:'center' }}>
                <Row>
                    <Col sm="15">
                        <Card className="card-addmeal">
                            <CardBody>
                                <CardTitle className="text-center">
                                      <h1 className="addmeal-text">  Add Meal</h1>
                                </CardTitle>
                            </CardBody>
                            <CardBody>
                                <Form>
                                    <FormGroup row >
                                        <Label for="meal" sm={3} className="addmeal-text"><h4>Meal ID</h4></Label>
                                        <Col sm={7}>
                                            <Input type="text" name="meal" id="meal" value={meal} onChange={this.handleChange}/>
                                        </Col>
                                        <Label for="meal" sm={3} className="addmeal-text"><h4>Meal Name</h4></Label>
                                        <Col sm={7}>
                                            <Input type="text" name="meal_name" id="meal_name" value={meal_name} onChange={this.handleChange}/>
                                        </Col>
                                    </FormGroup>

                                    <div className='contain-addmeal'>
                                    {this.customRow(ingred)}
                                    {this.customRow1(quant)}
                                    </div>

                                    <FormGroup row>
                                        <Col sm={{ size: 15 }}>
                                            <Button color="Success"  className="float-right" 
onClick={this.handleClick} >Add</Button>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="options" sm={4}></Label>
                                        <Col sm={7}>
                                            <Button color="Success" onClick={this.handleSave}>
Save</Button> &nbsp;
                            <Button color="Success" onClick={this.handleReset}>Reset</Button>
                                        </Col>
                                    </FormGroup>
 
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
            </div>
            </div>
        );
    }
}

 
export default AddMealHome;