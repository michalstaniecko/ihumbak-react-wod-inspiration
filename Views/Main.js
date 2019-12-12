import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, RefreshControl, SafeAreaView, StatusBar} from 'react-native';
import {Header, Left, Right, Body, Icon, Title, Container, Content, Button, H1, H2, H3} from 'native-base';
import {NavigationEvents, NavigationActions} from 'react-navigation';

import ListingData from './Listing/ListingData';
import ListingItem from './Listing/ListingItem';

import Greeting from './../Components/Greeting';
import TopBar from './../Components/Header';

import user from './../Helpers/User';


//import s from './../Styles/Bootstrap';
import styles from './../Styles/Styles';
import FabAddWOD from "../Components/FabAddWOD";


export default class Main extends Component {

	static navigationOptions = {
		title: 'Main Page',
		headerRight: 'Main Page'
	};

	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			refreshing: false,
			isLogged: user.isLogged()
		};

	}

	async componentWillMount() {
		await Expo.Font.loadAsync({
			/*'Roboto': require('/native-base/Fonts/Roboto.ttf'),
			'Roboto_medium': require('/native-base/Fonts/Roboto_medium.ttf'),*/
		});
	}

	componentDidMount() {
		this.getTodayWod();
	}


	getTodayWod = () => {
		ListingData.getListingWOD(0, 1).then((data) => {
			this.setState({
				isLoading: data.isLoading,
				dane: data.data,
				refreshing: false
			});
		})
			.catch(error => {
				console.error(error);
			});
	};

	_onRefresh = () => {
		this.setState({refreshing: true});
		this.getTodayWod();
	};


	render() {
		if (this.state.isLoading) {

			return <Text>Loading</Text>;
		}

		return (

			<Container>

				<TopBar title="Main Page" navigation={this.props.navigation}/>
				<View style={{flex:1}}>
					<Content
						padder
						refreshControl={
							<RefreshControl
								refreshing={this.state.refreshing}
								onRefresh={this._onRefresh}
							/>
						}>
						<Greeting navigation={this.props.navigation}/>
						<H2 style={[]}>
							{'Workout of the Day'}
						</H2>
						<ListingItem
							title={this.state.dane[0].title.rendered}
							wod_description={this.state.dane[0].wod_meta.wod_description}
							navigation={this.props.navigation}
							id={this.state.dane[0].id}
						/>
					</Content>
					<FabAddWOD/>
				</View>
			</Container>
		)
	}
}
