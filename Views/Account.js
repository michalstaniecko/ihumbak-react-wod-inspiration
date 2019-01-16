import React, {Component} from 'react';
import {StyleSheet, View, ScrollView, Button, TextInput, AsyncStorage} from 'react-native';

import TopBar from './../Components/Header';
import {Container, Content, Text} from "native-base";

export default class Account extends Component {
	render() {
		var title = "Your Account";
		return (
			<Container>
				<TopBar title={title} navigation={this.props.navigation}/>
				<Content>
					<Text>Profile, change password etc.</Text>
				</Content>
			</Container>
		)
	}
}