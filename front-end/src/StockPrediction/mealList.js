import React, { Component } from 'react'
import axios from 'axios'
import './Meal.css';

class MealList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			predict: "",
			suggest: [],
			safety: [],
			reorder: [],
			ingred:[],
			errorMsg: ''
		}
	}

	componentDidMount() {
		axios
			.get('/result')
			.then(response => {
				console.log(response);
				console.log(response.data.suggestions);
				this.setState({predict: response.data.prediction, 
					suggest: response.data.suggestions , 
					safety:response.data.safe,
					reorder:response.data.reorder,
					ingred:response.data.ingredients
				})
                
			})
			.catch(error => {
        		this.setState({errorMsg: 'Error retrieving data'})
            })
	}
 
	render() {
		const listIngredients = this.state.ingred.map((ingred) =>
		<p>{ingred}</p>
		);
		const listSuggestions = this.state.suggest.map((suggestion) =>
				<p >{suggestion}</p>
		);
		const listSafety = this.state.safety.map((safety) =>
		<p>{safety}</p>
		);
		const listReorder = this.state.reorder.map((reorder) =>
		<p>{reorder}</p>
		);	

		return (
			<div >
				<p >Predicted number of orders: {this.state.predict}</p>
				<div className='contain'>
					Ingredients
					{listIngredients}
					Cycle stock
					{listSuggestions}
					Safety Stock
					{listSafety}
					Reorder Point
					{listReorder}
				</div>
			</div>
		)
	}
}

export default MealList
