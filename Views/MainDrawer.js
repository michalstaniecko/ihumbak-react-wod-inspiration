
import React, {Component} from 'react';

import {
	createAppContainer,
	createDrawerNavigator, DrawerItems,

} from "react-navigation";
import Main from "./Main";
import Listing from "./Listing";
import Account from "./Account";
import Logout from "./Logout";
import {SafeAreaView, ScrollView, Text} from "react-native";


export const MainDrawer = createDrawerNavigator({
	Main: {
		screen: Main,
		navigationOptions: ({navigation}) => ({
			title: 'Main Page',
			drawerLabel: 'Main Page',
		}),
	},
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
	PrivateListing: {
		screen: Listing,
		navigationOptions: ({navigation}) => ({
			title: 'Your Workouts',
			drawerLabel: 'Your Workouts'
		}),
		params: {
			listingType: 'private'
		}
	},
	Account: {
		screen: Account,
	},
	Logout: {
		screen: Logout,
		navigationOptions: ({navigation}) => ({})
	}
}, {
	contentComponent: props => menu(props)
});


function menu(props) {
	return (

		<ScrollView navigation={props}>
			<SafeAreaView>
				<Text>Header</Text>
				<DrawerItems {...props} />
			</SafeAreaView>
		</ScrollView>
	)
}


const MainDrawerContainer = createAppContainer(MainDrawer);

export default class MainDrawerNavigator extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<MainDrawerContainer mainDrawer={this.props.navigation}/>
		)
	}


}