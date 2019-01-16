
import React, {Component} from 'react';

import {
	createAppContainer,
	createStackNavigator,

} from "react-navigation";

import Listing from "./Listing";
import Single from "./Single";


const ListingStack = createStackNavigator({
	Listing: {
		screen: Listing,
		navigationOptions: ({navigation}) => ({
			title: 'Public Workouts',
			drawerLabel: 'Public Workouts'
		}),
		params: {
			listingType: 'public'
		}
	},
	Single: {
		screen: Single
	},
}, {
	initialRouteName: 'Listing',
	headerMode: 'none'

});


const ListingStackContainer = createAppContainer(ListingStack);

export default class ListingStackNavigator extends Component {
	constructor(props) {
		super(props);

	}

	render() {
		return (
			<ListingStackContainer/>
		)
	}

}