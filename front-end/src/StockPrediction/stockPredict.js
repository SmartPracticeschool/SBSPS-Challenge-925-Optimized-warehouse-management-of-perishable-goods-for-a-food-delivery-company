import React, { Component } from 'react'
import axios from 'axios'
import CanvasJSReact from './canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;

class StockPredict extends Component {
	constructor(props) {
        super(props)
        this.toggleDataSeries = this.toggleDataSeries.bind(this);
        this.addSymbols = this.addSymbols.bind(this);
		this.state = {
            cycle: [],
            safety: [],
            errorMsg: ''
		}
	}

	componentDidMount() {
        axios
            .get('/fetchcycle')
            .then(response => {
                console.log(response.data);
                this.setState({cycle: response.data.data,
                })

                axios
                    .get('/fetchsafety')
                    .then(response => {
                        console.log(response.data);
                        this.setState({safety: response.data.data,
                        })
                        
                    })
                    .catch(error => {
                        this.setState({errorMsg: 'Error retrieving safety data'})
                    })
                
            })
            .catch(error => {
                this.setState({errorMsg: 'Error retrieving cycle data'})
            })


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

    render(){
        //const { meal, ingred, quant } = this.state;
        const options = {
			animationEnabled: true,
			colorSet: "colorSet1",
			title:{
                text: "Predicted stock requirement for 10 weeks"
            },
            subtitles: [{
                text: "Click Legend to Hide or Unhide Data Series"
            }], 
            axisX: {
                title: "Ingredients"
            },
            axisY: {
                title: "Quantity",
                titleFontColor: "#4F81BC",
                lineColor: "#4F81BC",
                labelFontColor: "#4F81BC",
                tickColor: "#4F81BC"
            },
            axisY2: {
                title: "Clutch - Units",
                titleFontColor: "#C0504E",
                lineColor: "#C0504E",
                labelFontColor: "#C0504E",
                tickColor: "#C0504E"
            },
            toolTip: {
                shared: true
            },
            legend: {
                cursor: "pointer",
                itemclick: this.toggleDataSeries
            },
            data: [{
                type: "column",
                name: "Cycle stock",
                showInLegend: true,      
                yValueFormatString: "#,##0.# Units",
                dataPoints: this.state.cycle
            },
            {
                type: "column",
                name: "Safety stock",
                //axisYType: "secondary",
                showInLegend: true,
                yValueFormatString: "#,##0.# Units",
                dataPoints: this.state.safety
            }]
        }
        
        return(
            <div>
                <CanvasJSChart options = {options} 
                    onRef={ref => this.chart = ref}
                />
            </div>
        )
    }
}

export default StockPredict;