import React from 'react';
import {
	View,
  	Text,
  	Button, ScrollView, TouchableOpacity,	
  	AsyncStorage, StyleSheet
} from 'react-native';
import * as Storage from '../components/Storage.js'
import {Agenda} from 'react-native-calendars';

export default class CalendarScreen extends React.Component {
	constructor(props){
        super(props);
        this.state = {
			items: {},
        }
			}


	
	static navigationOptions = ({navigation}) => {
		return {
      headerTitle: 'Calendar',
      headerRight: (
        <Button
          onPress={() => navigation.navigate('addItem', {
						onAddItem: navigation.state.params.onAddItem
					})}
          title="Create task" style={styles.addButton}
        />
      ),
    };

	};

	componentDidMount(){
		this.props.navigation.setParams({ onAddItem: this.onAddItem})
		Storage.getTasks().then(item => this.onMountAddTasks(item))
	}

	onMountAddTasks(item){
		let new_items = {}
		Object.keys(item).forEach(key => {
			let newKey = item[key].key
			new_items[newKey] = item[key].info
		})
		
		this.setState({items: new_items})

	}

	componentDidUpdate(prevProps, prevState){
		if(prevState.items != this.state.items){
			let dataList = []
			Object.keys(this.state.items).forEach(key => dataList.push({'key': key, 'info': this.state.items[key]}))
			Storage.storeTasks(dataList)
			
		}
	}


  	render() {
			const date = new Date()
			selectedDate = date.toISOString().split('T')[0];

		return (
			<Agenda
        items={this.state.items}
				selected={selectedDate}
        renderItem={this.renderItem.bind(this)}
				renderEmptyDate={this.renderEmptyDate.bind(this)}
				rowHasChanged={this.rowHasChanged.bind(this)}
				renderEmptyData={this.renderEmptyData.bind(this)}
      />
		);
		}
		
		  renderItem(item) {
			return (
				<View style={[styles.item, {height: 100}]}>
				<TouchableOpacity>
				<Text>{item.name ? item.name : ''}</Text><Text>{item.text ? item.text : ''}</Text>
				</TouchableOpacity>
				</View>
			)
			}
		
		  renderEmptyDate() {
			return (
			  <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
			);
			}
			
			renderEmptyData() {
				return (
					<View style={styles.emptyData}><Text style={styles.text}>Nothing happens today</Text></View>
				);

			}
		
		  rowHasChanged(r1, r2) {
			return r1.info !== r2.info;
		  }
			
			onAddItem = (data) => {
				const date = data.date
				const time = data.startTime + "-" + data.endTime
				if(!this.state.items[date]){
					this.state.items[date] = []
					this.state.items[date].push({
						name: time,
						text: data.text,
					})
				}else{
					this.state.items[date].push({
						name:time,
						text: data.text,
					})
				}
			  const newItems = {};
			  Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
				this.setState({items: newItems })
				
				
			}
		}
		
		const styles = StyleSheet.create({
		  item: {
			backgroundColor: 'white',
			flex: 1,
			borderRadius: 5,
			padding: 10,
			marginRight: 10,
			marginTop: 17
		  },
		  emptyDate: {
			height: 15,
			flex:1,
			paddingTop: 30
			},
			addButton:{
				fontSize: 80
			},
			emptyData: {
				flex: 1,
				justifyContent: 'center',
				backgroundColor: 'white'

			},
			text: {
				alignSelf: 'center',
				fontSize: 20
			}
		});

