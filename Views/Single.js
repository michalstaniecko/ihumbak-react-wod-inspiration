import React, {Component} from 'react';

import TopBar from './../Components/Header';
import {Container, Content, Text, Button, Left, Body, Title, Right, Icon, Header} from "native-base";

export default class Account extends Component {
	render() {
		console.log(this.props.navigation.getParam('id'));
		var title = "Single";
		return (
			<Container>
				<Header>
					<Left>
						<Button transparent
						        onPress={() => {
							        this.props.navigation.goBack()
						        }}
						>
							<Icon name="arrow-back"/>
						</Button>
					</Left>
					<Body>
					<Title>
						Single WOD
					</Title>
					</Body>
					<Right>
						<Button transparent>
							<Icon name="contact"/>
						</Button>
					</Right>
				</Header>
				<Content>
					<Text>Single WOD</Text>
					<Button  onPress={() => this.props.navigation.goBack()}><Text>Go Back</Text></Button>
				</Content>
			</Container>
		)
	}
}