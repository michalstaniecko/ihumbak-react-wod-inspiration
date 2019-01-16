import React, {Component} from 'react';
import {} from 'react-native';

import App from '../App';

import {Container, Content,Text} from 'native-base';
import user from "../Helpers/User";

import {NavigationActions, withNavigation} from 'react-navigation';


const setParamsAction = NavigationActions.navigate({
	routeName: "LoginDrawer",
	params: {
		title: "Login"
	},
	action: NavigationActions.navigate('LoginDrawer')
});

export default class Logout extends Component {
	constructor(props) {
		super(props);
		this._logout();
	}

	_logout = () => {
		console.log(this.props.navigation);
		user.removeUserData(() => {
			this.props.navigation.dispatch(setParamsAction);
		});
	};


	render() {
		return (
			<Container>
				<Content><Text>Logout</Text></Content>
			</Container>
		)
	}

}