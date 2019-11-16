import React from 'react';
import Header from './Header'

import { BarChart, Brush, d3 } from 'react-d3-components';




export default class Stats extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			data : [{
				label: 'somethingA',
				values: [{x: 'AnsweredA', y: 10}, {x: 'SomethingB', y: 4}, {x: 'SomethingC', y: 3}]
			}]
		}
	}

	render(){

		return(
			<div>
				<Header goTo ={this.props.history}/>
				 <BarChart
        data={this.state.data}
        width={400}
        height={400}
        margin={{top: 10, bottom: 50, left: 50, right: 10}}/>
			</div>
		)

	}

}
