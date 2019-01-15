import React, {Component} from 'react';
import {View, Button} from 'react-native';
import {NavigationEvents, NavigationActions} from 'react-navigation';

import {Card, CardItem, Body, Text} from "native-base";

import user from './../Helpers/User';

import s from './../Styles/Bootstrap';

const setParamsAction = NavigationActions.navigate({
	routeName: "LoginDrawer",
	params: {
		title: "Login"
	},
	action: NavigationActions.navigate('LoginDrawer')
});

export default class Greeting extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLogged: false,
		};
		this._showUserData();
	}


	_logout = () => {
		this.props.navigation.navigate('Logout');
	};

	_showUserData() {
		user.getUserData(result => {
			if (result) {
				var result = (JSON.parse(result));
				this.setState({
					isLogged: true,
					userName: result.userDisplayName
				});
			} else {
				this.setState({
					isLogged: false
				})
			}
		});
	};


	render() {
		var isLogged = this.state.isLogged;
		return (
			<View>
				<Card>
					<CardItem>
						<Text>{isLogged ? (
							'Witaj. Zalogowany jako ' + this.state.userName
						) : (
							'Nie jesteś zalogowany'
						) }</Text>

					</CardItem>
				</Card>
				{/*
				<Button title="Wyloguj" onPress={this._logout}/>
				<Button title="Pokaż userData" onPress={this._showUserData} />
				<Button title="Main Page" onPress={() => {
					this.props.navigation.dispatch(setParamsAction);
				}}/>
				*/}
			</View>
		)
	}
}