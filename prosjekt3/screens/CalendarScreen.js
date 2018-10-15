import React from 'react';
import {
	View,
  	Text,
  	Button, ScrollView,
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
						date: '',
						startTime: '',
						endTime: '',
						onAddItem: navigation.state.params.onAddItem
					})}
          title="Add"
        />
      ),
    };

	};

	componentDidMount(){
		this.props.navigation.setParams({
			onAddItem: this.onAddItem
		})
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
				pastScrollRange={50}
				// Max amount of months allowed to scroll to the future. Default = 50
				futureScrollRange={50}
        // markingType={'period'}
        // markedDates={{
        //    '2017-05-08': {textColor: '#666'},
        //    '2017-05-09': {textColor: '#666'},
        //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
        //    '2017-05-21': {startingDay: true, color: 'blue'},
        //    '2017-05-22': {endingDay: true, color: 'gray'},
        //    '2017-05-24': {startingDay: true, color: 'gray'},
        //    '2017-05-25': {color: 'gray'},
        //    '2017-05-26': {endingDay: true, color: 'gray'}}}
         // monthFormat={'yyyy'}
         // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
        //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
      />
		);
	  }
	
		  renderItem(item) {
			return (
			  <View style={[styles.item, {height: item.height}]}><Text>{item.name}</Text><Text>{item.text}</Text></View>
			);
		  }
		
		  renderEmptyDate() {
			return (
			  <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
			);
		  }
		
		  rowHasChanged(r1, r2) {
			return r1.info !== r2.info;
		  }
			
			onAddItem = (data) => {
				const date = data.date
				const time = data.startTime + "-" + data.endTime
				const height = Math.max(50, Math.floor(Math.random() * 150))
				if(!this.state.items[date]){
					this.state.items[date] = []
					this.state.items[date].push({
						name: time,
						text: data.text,
						height: height
					})
				}else{
					this.state.items[date].push({
						name:time,
						text: data.text,
						height: height
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
		  }
		});

