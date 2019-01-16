
import React, {Component} from 'react';

import {
	createAppContainer,
	createStackNavigator,

} from "react-navigation";

import Listing from "./Listing";
import Single from "./Single";
import MainDrawerNavigator from "./MainDrawer";


const HomeStack = createStackNavigator({
	MainDrawer: {
		screen: MainDrawerNavigator,
		navigationOptions: ({navigation}) => ({
		}),
		params: {
		}
	},
	Single: {
		screen: Single
	},
}, {
	initialRouteName: 'MainDrawer',
	headerMode: 'none'

});


const HomeStackContainer = createAppContainer(HomeStack);

export default class HomeStackNavigator extends Component {
	constructor(props) {
		super(props);

	}

	render() {
		return (
			<HomeStackContainer  />
		)
	}

}