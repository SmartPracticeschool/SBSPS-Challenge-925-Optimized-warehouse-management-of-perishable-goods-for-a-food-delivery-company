import React, { Component } from 'react';
import { Container, Row, Col, Card, CardTitle, CardBody, Button, Form, FormGroup, Label, Input } 
from 'reactstrap';
 
class AddMealHome extends Component {
 
    constructor(props) {
        super(props);
        this.defaultOption = { "id": "-1", "value": "" };
        this.state = {
            question: "",
            options: [this.defaultOption]
        }
    }
 
    handleChange = (e) => {
        let { id, value } = e.target;
        this.setState({ [id]: value })
    }
 
    handleOptionsChange = (index, e) => {
        // eslint-disable-next-line 
        let { id, value } = e.target;
        let stateOptionsClone = JSON.parse(JSON.stringify(this.state.options));
        stateOptionsClone[index].value = value;
        this.setState({ options: stateOptionsClone });
    }
 
    handleSave = (e) => {
        e.preventDefault();
    }
 
    resetQuestion = () => {
        let emptyQuestion = "";
        return emptyQuestion
    }
 
    resetOptions = (options) => {
        let emptyOptions = options.map(
            (data) => {
                data.value = '';
                return data;
            }
        )
        return emptyOptions;
    }
 
    handleReset = (e) => {
        let stateClone = JSON.parse(JSON.stringify(this.state));
        let emptyQuestion = this.resetQuestion();
        let emptyOptions = this.resetOptions(stateClone.options);
        this.setState({ question: emptyQuestion, options: emptyOptions });
        e.preventDefault();
    }
 
    handleDelete = (index, e) => {
        let stateClone = JSON.parse(JSON.stringify(this.state.options));
        stateClone.splice(index, 1);
        this.setState({ options: stateClone });
        e.preventDefault();
    }
 
    handleClick = (e) => {
        let stateClone = JSON.parse(JSON.stringify(this.state));
        stateClone.options.push(this.defaultOption);
        this.setState({ options: stateClone.options });
        e.preventDefault();
    }
 
    customRow = (options) => {
        const listItems = options.map((cusRow, index) =>
            <FormGroup row key={index}>
                <Label for="options" sm={3} className="text-right">Ingredient {index + 1}</Label>
                <Col sm={7}>
                    <Input type="text" name="options" id="options" value={cusRow.value} 
onChange={(e) => this.handleOptionsChange(index, e)} />
                </Col>
                <Col sm={1}>
                    <Button color="primary" onClick={(e) => this.handleDelete(index, e)}>X</Button>
                </Col>
 
            </FormGroup>
        );
        return (
            listItems
        )
        
    }
    
 
    render() {
        let { question, options } = this.state;
        return (
            <div>

            <Container>
                <Row>
                    <Col sm="10">
                        <Card>
                            <CardBody>
                                <CardTitle className="text-center">
                                        Add Meal
                                </CardTitle>
                            </CardBody>
                            <CardBody>
                                <Form>
                                    <FormGroup row>
                                        <Label for="question" sm={3} className="text-right">Meal ID</Label>
                                        <Col sm={7}>
                                            <Input type="text" name="question" id="question" 
value={question} onChange={this.handleChange} />
                                        </Col>
                                    </FormGroup>
 
                                    {this.customRow(options)}
 
                                    <FormGroup row>
                                        <Col sm={{ size: 10 }}>
                                            <Button color="primary" className="float-right" 
onClick={this.handleClick} >Add</Button>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="options" sm={3}></Label>
                                        <Col sm={7}>
                                            <Button color="primary" onClick={this.handleSave}>
Save</Button> &nbsp;
                            <Button color="primary" onClick={this.handleReset}>Reset</Button>
                                        </Col>
                                    </FormGroup>
 
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
            </div>
        );
    }
}

 
export default AddMealHome;
