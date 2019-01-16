import React, {Component} from 'react';


import {Card, CardItem, Body, Title, Text} from 'native-base';


export default class ListingItem extends Component {

	render() {
		return (
			<Card>

				<CardItem header bordered button
				          onPress={() => {

				          	this.props.navigation.navigate('Single');
				          }}>
					<Text>{this.props.title}</Text>
				</CardItem>
				<CardItem bordered>
					<Body>
					<Text>{this.props.wod_description}</Text>
					</Body>
				</CardItem>
				<CardItem footer bordered>
					<Text>Modalities</Text>
					<Text>Excersice</Text>
				</CardItem>
			</Card>
		);
	};
}