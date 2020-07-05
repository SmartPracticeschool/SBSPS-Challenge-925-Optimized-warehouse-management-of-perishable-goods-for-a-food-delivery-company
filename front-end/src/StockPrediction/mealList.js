import React, { Component } from 'react'
import axios from 'axios'
import './Meal.css';

import CanvasJSReact from './canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart2 = CanvasJSReact.CanvasJSChart;

class MealList extends Component {
	constructor(props) {
		super(props)
		this.toggleDataSeries = this.toggleDataSeries.bind(this);
		this.addSymbols = this.addSymbols.bind(this);
		this.state = {
			predict: "",
			cycle: [],
			safety: [],
			reorder: [],
			ingred:[],
			order:[],
			errorMsg: ''
		}
	}

	addSymbols(e) {
		var suffixes = ["", "K", "M", "B"];
		var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
		if (order > suffixes.length - 1)
			order = suffixes.length - 1;
		var suffix = suffixes[order];
		return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
	}
	toggleDataSeries(e){
		if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		}
		else{
			e.dataSeries.visible = true;
		}
		this.chart.render();
	}

	componentDidMount() {
		axios
			.get('/result')
			.then(response => {
				console.log(response);
				console.log(response.data.suggestions);
				this.setState({predict: response.data.data[0], 
					ingred:response.data.data[1],
					order:response.data.data[2],
					cycle:response.data.data[3],
					safety:response.data.data[4],
					reorder:response.data.data[5]
				})
                
			})
			.catch(error => {
        		this.setState({errorMsg: 'Error retrieving data'})
            })
	}
 
	render() {
		const options = {
			animationEnabled: true,
			colorSet: "colorSet2",
			title: {
				text: "Meal Stock Prediction"
			},
			axisX: {
				title: "Ingredients"
			},
			axisY: {
				title:"Quantity"
				//labelFormatter: this.addSymbols
			},
			toolTip: {
				shared: true
			},
			legend: {
				cursor: "pointer",
				itemclick: this.toggleDataSeries,
				verticalAlign: "top"
			},
			data: [{
				///Raw Material Prediction
				type: "column",
				name: "Raw Materials Required",
				showInLegend: true,
				dataPoints: this.state.cycle
			},{
				///Reorder Point
				type: "line",
				name: "Reorder Point",
				showInLegend: true,
				dataPoints: this.state.reorder
			},{
				///Safety Stock
				type: "area",
				name: "Safety Stock",
				markerBorderColor: "white",
				markerBorderThickness: 2,
				showInLegend: true,
				dataPoints: this.state.safety
			}]
		}

		const options1 = {
			animationEnabled: true,
			title:{
				text: "Predicted Sales"
			},
			axisX: {
				title: "Weeks"
			},
			axisY: {
				title: "Number of orders",
				includeZero: false
			},
			data: [{
				type: "spline",
				dataPoints: this.state.order
			}]
		}
		
		return (
		<div>
			<div>
			<CanvasJSChart2 options = {options1} 
				onRef={ref => this.chart = ref}
			/>
			</div>
			<div>
			<CanvasJSChart options = {options} 
				onRef={ref => this.chart = ref}
			/>
			</div>

			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);

	}
}

export default MealList
