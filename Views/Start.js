import React, {Component} from 'react';
import {Text} from 'react-native';

import {Container, Content} from 'native-base';

import user from './../Helpers/User';

export default class Start extends Component {
	constructor(props) {
		super(props);
		this._bootstrapAsync();
	}

	_bootstrapAsync() {
		user.getUserData((userData) => {
			if (userData) {
				this.props.navigation.navigate('MainDrawer');
			} else {
				this.props.navigation.navigate('LoginDrawer');
			}
		});
	}

	render() {
		return (
			<Container>
				<Content><Text>Authentication</Text></Content>
			</Container>
		)

	}

}