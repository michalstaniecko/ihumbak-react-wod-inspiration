import React, {Component} from 'react';

import {
	Container,
	Content,
	View,
	Text,
	Fab,
	Left,
	Body,
	Title,
	Right,
	Button,
	Icon,
	Header,
	Card,
	CardItem,
	Input, Item, Label, Form,
	Textarea
} from "native-base";

import user from './../Helpers/User';


export default class AddWOD extends Component {
	constructor(props) {
		super(props);

	}


	_addPost() {
		user.getUserData(data => {
			var user = JSON.parse(data);
			var token = user.authToken;
			let formData = new FormData();
			formData.append('title', this.state.workoutName);
			formData.append('wod_meta', '{"meta_name":"wod_description", "value":"'+this.state.workoutDescription+'"}');
			formData.append('status', 'private');
			return fetch('http://staging.wod-inspiration.com/wp-json/wp/v2/wod/', {
				method: 'POST',
				headers: {
					Authorization: 'Bearer ' + token
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
		});
		/*
		*/
	}

	render() {
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
						Add WOD
					</Title>
					</Body>
					<Right>
						<Button transparent>
							<Icon name="contact"/>
						</Button>
					</Right>
				</Header>
				<Content padder>
					<Form>
						<Item regular>
							<Input

								placeholder="Workout Name"
								onChangeText={(text) => this.setState({workoutName: text})}
							/>
						</Item>
						<Textarea
							style={{paddingTop:5, paddingBottom: 5}}
							placeholder="Workout Description"
							bordered
							rowSpan={5}
							onChangeText={(text) => this.setState({workoutDescription: text})}
						/>

						<Button style={{marginTop:5}} onPress={() => this._addPost()}><Text>Add Workout</Text></Button>

					</Form>
				</Content>
			</Container>
		);
	}

}