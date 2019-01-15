import React, {Component} from 'react';
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	AsyncStorage,
	StatusBar,
	SafeAreaView
} from 'react-native';

import user from './../Helpers/User';

import s from './../Styles/Bootstrap';
import styles from './../Styles/Styles';
import {Body, Header, Title, Container, Content, Input, Button, Form, Item, Label} from "native-base";

import TopBar from './../Components/Header';

export default class Login extends Component {

	static navigationOptions = {
		title: 'Login Page',
		headerTitle: <Text>Login Page</Text>
	};

	constructor(props) {
		super(props);
		this.state = {
			loggedIn: false,
			validating: false
		};

	}

	componentDidMount() {
		this._getUserData();
	}

	_getUserData = async () => {
		try {
			const value = await AsyncStorage.getItem('user');
			if (value !== null) {
				let data = JSON.parse(value);
				console.log(data);

				this.setState({authToken: data.authToken});
			}
		} catch (error) {

		}
	};

	onLogin() {

	}

	validate_jwt() {
		this.setState({validating: true, loginError: null});

		let formData = new FormData();
		formData.append('type', 'login');
		formData.append('username', this.state.email);
		formData.append('password', this.state.password);
		return fetch('http://staging.wod-inspiration.com/wp-json/jwt-auth/v1/token', {
			method: "POST",
			body: formData
		})
			.then((response) => response.json())
			.then((responseJson) => {
				let data = responseJson;


				if (data.token) {

					if (user.setUserData(data)) {
						this.setState({
							validating: false
						});
						this.props.navigation.navigate('MainDrawer');
					} else {
						console.log('Failed to store auth');
					}
				} else {
					this.setState({
						loginError: 'Incorrect login or password.'
					})
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}

	async saveToStorage(userData) {
		if (userData) {
			await AsyncStorage.setItem('user', JSON.stringify({
				isLoggedIn: true,
				authToken: userData.token,
				userEmail: userData.user_email,
				userNicename: userData.user_nickname,
				userDisplayName: userData.user_display_name
			}));

			return true;
		}

		return false;
	}

	_addPost() {
		console.log(this.state.authToken);
		let formData = new FormData();
		formData.append('title', 'test dodawania posta');
		return fetch('http://staging.wod-inspiration.com/wp-json/wp/v2/posts/', {
			method: 'POST',
			headers: {
				Authorization: 'Bearer ' + this.state.authToken
			},
			body: formData
		})
			.then((response) => response.json())
			.then((responseJson) => {
				console.log(responseJson);
			})
			.catch((error) => {
				console.error(error);
			});
	}

	_loginError() {
		if (this.state.loginError) {
			return <Text>{this.state.loginError}</Text>
		}
	}

	render() {

		if (!this.state.loggedIn) {

			return (
				<Container
				>
					<TopBar title="Login" navigation={this.props.navigation}/>
					<Content >
						<Form>
							<Item floatingLabel error={false}>
								<Label>Login or e-mail</Label>
								<Input
									onChangeText={(text) => this.setState({email: text})}
									keyboardType="email-address"/>
							</Item>
							<Item floatingLabel last>
								<Label>Password</Label>
								<Input secureTextEntry={true}
								       onChangeText={(text) => this.setState({password: text})}
								/>
							</Item>

						</Form>
						{this._loginError()}
						<Button
							light block

							onPress={() => {
								/*if (this.state.email && this.state.password) {

									this.validate();
								}*/
								this.validate_jwt()
							}}>
							<Text>Login</Text>
						</Button>
					</Content>
				</Container>
			)
		}
		return (
			<Text>You are logged in.</Text>
		)
	}
}