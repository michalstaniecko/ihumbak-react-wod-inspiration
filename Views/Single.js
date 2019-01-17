import React, {Component} from 'react';

import TopBar from './../Components/Header';
import {Container, Content, Text, Button, Left, Body, Title, Right, Icon, Header} from "native-base";

import ListingData from './Listing/ListingData';
import user from './../Helpers/User';
import {RefreshControl} from "react-native";
import SingleItem from "./Single/SingleItem";

export default class Account extends Component {
	constructor(props) {
		super(props);
		this.state = {
			postID: this.props.navigation.getParam('postID'),
			status: this.props.navigation.getParam('status'),
			isLoading: true
		}

	}

	componentDidMount() {
		this._getDetailItem(this.state.postID, this.state.status);
		console.log(this.state.postID, this.state.status);
	}

	_getDetailItem(postID, status) {
		if (status=='private') {
			user.getUserData(response => {
				var userData = JSON.parse(response);
				ListingData.getSingleWOD(postID, status, userData)
					.then(data => {
						console.log(data);
						this.setState({
							postTitle: data.data.title.rendered,
							postDescription: data.data.wod_meta.wod_description,
							isLoading: false
						})
					});

			});
		} else {
			ListingData.getSingleWOD(postID, status)
				.then(data => {
					console.log(data);
					this.setState({
						postTitle: data.data.title.rendered,
						postDescription: data.data.wod_meta.wod_description,
						isLoading: false
					})
				});
		}

	}

	_onRefresh = () => {
		this.setState({isLoading: true});
		this._getDetailItem(this.state.postID);
	};

	render() {
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
						WOD: {this.state.postTitle}
					</Title>
					</Body>
					<Right>
						<Button transparent>
							<Icon name="contact"/>
						</Button>
					</Right>
				</Header>
				<Content padder>
					<SingleItem title={this.state.postTitle} description={this.state.postDescription} />
					<Button  onPress={() => this.props.navigation.goBack()}><Text>Go Back</Text></Button>
				</Content>
			</Container>
		)
	}
}