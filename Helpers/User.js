import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';

class User extends Component {

	constructor(props) {
		super(props);
		this.displayUser();
	}

	displayUser = async () => {
		const value = await AsyncStorage.getItem('user');
	};

	isLogged = async () => {
		try {
			const value = await AsyncStorage.getItem('user');
			if (value !== null) {
				return true;
			}
			return false;
		} catch (error) {

		}
		return false;
	};

	logout = () => {
		this.removeUserData();
	};

	async getUserData(callback) {
		try {

			AsyncStorage.getItem('user')
				.then((value) => {
					callback(value);
				})
		} catch {
			console.log('getUserData error');
		}
	};

	async removeUserData(callback) {
		try {
			await AsyncStorage.removeItem('user');
			callback();
		} catch (exception) {
			console.log(exception);
		}
	};

	setUserData(userData) {
		if (userData) {
			AsyncStorage.setItem('user', JSON.stringify({
				isLoggedIn: true,
				authToken: userData.token,
				userEmail: userData.user_email,
				userNicename: userData.user_nickname,
				userDisplayName: userData.user_display_name,
				userID: userData.user_id,
			}));

			return true;
		}

		return false;
	};

}

const user = new User();
export default user;