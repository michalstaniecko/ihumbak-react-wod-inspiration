/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, SafeAreaView, ScrollView, StatusBar} from 'react-native';


import {Icon, Button} from 'native-base';

import user from './Helpers/User';

import {
	createStackNavigator,
	createDrawerNavigator,
	createSwitchNavigator,
	createAppContainer,
	StackActions,
	DrawerActions,
	DrawerItems
} from "react-navigation";


import Logo from './Components/Logo';
import Main from './Views/Main';
import Listing from './Views/Listing';
import ListingStackNavigator from './Views/ListingStack';
import Login from './Views/Login';
import Account from './Views/Account';
import Logout from './Views/Logout';
import Start from './Views/Start';
import Single from './Views/Single';


export const MainDrawer = createDrawerNavigator({
	Main: {
		screen: Main,
		navigationOptions: ({navigation}) => ({
			title: 'Main Page',
			drawerLabel: 'Main Page',
		}),
	},
	Listing: {
		screen: ListingStackNavigator,
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

const LoginDrawer = createDrawerNavigator({
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
	Login: {
		screen: Login,
		navigationOptions: ({navigation}) => ({})
	}
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

const CustomDrawerComponent = (props) => {
	return (

		<ScrollView>
			<SafeAreaView>
				<Text>Header</Text>
				<DrawerItems {...props} />
			</SafeAreaView>
		</ScrollView>
	)
};

const LoginDrawerComponent = (props) => {
	return (

		<ScrollView>
			<SafeAreaView>
				<Text>Header</Text>
				<DrawerItems {...props} />
			</SafeAreaView>
		</ScrollView>
	)
};


const Navigation = createSwitchNavigator({
	Start: {
		screen: Start,
	},
	LoginDrawer: {
		screen: LoginDrawer,
		navigationOptions: ({navigation}) => ({
			title: 'Login Page',
			headerLeft: <Icon name="menu" onPress={() => {
			}}/>,
		})
	},
	MainDrawer: {
		screen: MainDrawer,
		navigationOptions: (navigation) => ({
			headerLeft: <Icon name="menu" onPress={() => {
			}}/>,
		})
	}

}, {
	initialRouteName: 'Start'
});

const AppContainer = createAppContainer(Navigation);

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoggedIn: false
		};
	}


	async componentWillMount() {
		await Expo.Font.loadAsync({
			'Roboto': require('native-base/Fonts/Roboto.ttf'),
			'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
		});
	}


	render() {
		return (
			<AppContainer navigation={this.props.navigation}/>

		)
	}
}