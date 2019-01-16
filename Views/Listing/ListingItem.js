import React, {Component} from 'react';

import {NavigationActions} from 'react-navigation';

import {Card, CardItem, Body, Title, Text} from 'native-base';


import s from './../../Styles/Bootstrap';

export default class ListingItem extends Component {

	render() {
		return (
			<Card>

				<CardItem header bordered button
				          onPress={() => {
				          	this.props.navigation.navigate('Single', {id: this.props.id});
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
	}
}