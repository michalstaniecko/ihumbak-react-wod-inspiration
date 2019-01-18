import React, {Component} from 'react';

import {Fab, Icon, Button} from 'native-base';

import user from './../Helpers/User';

import {withNavigation} from 'react-navigation';

class FabAddWOD extends Component {
	constructor(props) {
		super(props);
		this.state = {
			active: true,
			isLogged: false
		};
		user.getUserData(response => {
			var userData = JSON.parse(response);
			if (userData) {
				this.setState({
					isLogged: true,
				});
			}
		});
	}

	componentDidMount() {

	}


	render() {

		if (!this.state.isLogged) {
			return false;
		}
		return (
			<Fab
				active={this.state.active}
				onPress={() => this.props.navigation.navigate('AddWOD')}
			>
				<Icon name="add"/>
			</Fab>
		);
	}

}

export default withNavigation(FabAddWOD);