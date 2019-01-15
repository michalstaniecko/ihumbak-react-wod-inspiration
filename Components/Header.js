import React, {Component} from 'react';

import {Header, Body, Title, Button, Left, Right, Icon} from 'native-base';

export default class TopBar extends Component {
	constructor(props) {
		super(props);
	}

	_button() {
		return (
			<Button transparent
			        onPress={() => {
				        this.props.navigation.openDrawer()
			        }}
			>
				<Icon name="menu"/>
			</Button>
		)
	}

	render() {
		return (
			<Header>
				<Left>
					{this._button()}
				</Left>
				<Body>
				<Title>
					{this.props.title}
				</Title>
				</Body>
				<Right>
					<Button transparent>
						<Icon name="contact"/>
					</Button>
				</Right>
			</Header>
		)
	}
}