import React, {Component} from 'react';
import {
	StyleSheet,

	View,
	FlatList,
	ScrollView,
	Button,
	Dimensions,
	RefreshControl,
	StatusBar, SafeAreaView
} from 'react-native';
import {Container, Content, Text} from 'native-base';
import ListingData from './Listing/ListingData';
import ListingItem from './Listing/ListingItem';

import user from './../Helpers/User';

import s from './../Styles/Bootstrap';
import styles from './../Styles/Styles';
import TopBar from './../Components/Header';


export default class Listing extends Component {

	static navigationOptions = ({navigation}) => {
		return {
			title: 'Listing Page'
		}
	};

	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			offset: 0,
			refreshing: false,
			listingType: this.props.navigation.state.params.listingType,
			next: true
		};
	}

	componentDidMount() {
		if (this.state.listingType === 'private') {
			user.getUserData(response => {
				var userData = JSON.parse(response);
				this.getListWOD(userData);
				this.setState({
					user: userData
				});
			});
		} else if (this.state.listingType==='public') {
			this.getListWOD();
		}
	}

	getListWOD(user) {
		ListingData.getListingWOD(0, 10, user).then((data) => {
			this.setState({
				isLoading: data.isLoading,
				dane: data.data.length > 10 ? data.data.slice(0, -1) : data.data,
				offset: data.offset,
				next: data.data.length > 10,
				refreshing: false,
			});
		});
	}

	updateListWOD(user) {
		ListingData.getListingWOD(this.state.offset, 10, user).then((data) => {
			this.setState({
				dane: [...this.state.dane, ...(data.data.length > 10 ? data.data.slice(0, -1) : data.data)],
				offset: data.offset,
				next: data.data.length > 10,
				refreshing: false,
			});
		});
	}

	_renderListing = ({item}) => {
		return (
			<ListingItem
				navigation={this.props.navigation}
				title={item.title.rendered}
				wod_description={item.wod_meta.wod_description}
				id={item.id}
			/>
		);
	};

	_loadMore = () => {
		if (this.state.next) {

			this.setState({refreshing: true});
			this.updateListWOD(this.state.user);
		}
	};

	loadMoreButton() {
		if (this.state.next) {
			return (

				<Button title="Load More" onPress={this._loadMore}
				/>
			)
		}
	}

	_onScrollHandler = (event) => {
		let isBottom = event.nativeEvent.contentOffset.y >= (this.state.flatListHeight - this.state.scrollViewHeight);
		console.log(event.nativeEvent.contentOffset.y, (this.state.flatListHeight - this.state.scrollViewHeight));
		if (!this.state.refreshing && isBottom && this.state.next) {
			this._loadMore();
		}
	};

	setScrollViewHeight(layout,event) {
		console.log(event);
		this.setState({scrollViewHeight: layout.height});
	}

	setFlatListHeight(height) {
		this.setState({flatListHeight: height});

	}

	onEndReached = () => {
		if (!this.state.onEndReachedCalledDuringMomentum) {

			console.log('onEndReached');
		}
	};

	setHeaderHeight(height) {
		this.setState({headerHeight: height});
	}

	_onRefresh = () => {
		this.setState({refreshing: true});
		this.getListWOD(this.state.user);
	};

	isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {

		return layoutMeasurement.height + contentOffset.y >= contentSize.height - 1;
	};

	render() {

		console.log(this.props.ref);
		var title = this.state.listingType === 'public' ? 'Public WODs' : 'Your WODs';

		if (this.state.isLoading) {
			return (
				<View>

					<TopBar/>
					<Text>isLoading</Text>
				</View>
			)
		}
		return (
			<Container>

				<TopBar title={this.state.listingType} navigation={this.props.navigation}/>

				<Content
					padder
					onScroll={({ nativeEvent }) => {
						if (this.isCloseToBottom(nativeEvent)) {
							if (!this.state.refreshing) {
								this._loadMore();
							}
						}
					}}
					refreshControl={
						<RefreshControl
							refreshing={this.state.refreshing}
							onRefresh={this._onRefresh}
						/>
					}
				>

					<FlatList data={this.state.dane}
					          renderItem={this._renderListing}
					          keyExtractor={({id}, index) => id.toString()}
					          onLayout={(event) => {
						          this.setFlatListHeight(event.nativeEvent.layout.height)
					          }}
					          style={[s.p2]}
					/>
				</Content>
			</Container>
		);
	}
}
