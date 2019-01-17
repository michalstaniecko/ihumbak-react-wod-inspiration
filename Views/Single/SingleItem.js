import React, {Component} from 'react';

import {Container, Content, Text, Card, CardItem, Body} from 'native-base';

export default class SingleItem extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Card>
				<CardItem>
					<Body>
					<Text>
						{this.props.description}
					</Text>
					</Body>
				</CardItem>
				<CardItem footer bordered>
					<Text>Footer</Text>
				</CardItem>
			</Card>
		)
	}
}