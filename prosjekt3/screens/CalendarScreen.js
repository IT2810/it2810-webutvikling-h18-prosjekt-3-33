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
			currentDate: {
				date: '',
				startTime: '',
				endTime: '',
			}
        }
			}
			
			onload = (data) => {
				this.setState(data)
			}
	componendDidUpdate(prevProp,prevState){
		console.log(this.state.currentDate)
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
	}

	componentDidUpdate(prevProp,prevState){
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
		
		/*loadItems(day) {
			setTimeout(() => {
			  for (let i = -5; i < 5; i++) {
				const time = day.timestamp + i * 24 * 60 * 60 * 1000;
				const strTime = this.timeToString(time);
				if (!this.state.items[strTime]) {
				  this.state.items[strTime] = [];
				  const numItems = Math.floor(Math.random() * 5);
				  for (let j = 0; j < numItems; j++) {
					this.state.items[strTime].push({
					  name: 'Item for ' + strTime,
					  height: Math.max(50, Math.floor(Math.random() * 150))
					});
				  }
				}
				}
			  console.log(this.state.items);
			  const newItems = {};
			  Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
			  this.setState({
				items: newItems
			  });
			}, 1000);
			// console.log(`Load Items for ${day.year}-${day.month}`);
			}

			*/
		  renderItem(item) {
			return (
			  <View style={[styles.item, {height: item.height}]}><Text>{item.name}</Text></View>
			);
		  }
		
		  renderEmptyDate() {
			return (
			  <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
			);
		  }
		
		  rowHasChanged(r1, r2) {
			return r1.name !== r2.name;
		  }
		
		  timeToString(time) {
			const date = new Date(time);
			return date.toISOString().split('T')[0];
			}
			
			onAddItem = (data) => {
				const date = data.date
				const time = data.startTime + " " + data.endTime
				const height = Math.max(50, Math.floor(Math.random() * 150))
				if(!this.state.items[date]){
					this.state.items[date] = []
					this.state.items[date].push({
						name: time,
						height: height
					})
				}

				console.log(this.state.items);
			  const newItems = {};
			  Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
			  this.setState({items: newItems })
				

				

				/*data = {
					date: '',
					startTime: '',
					endTime: '',
				}
				*/
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

