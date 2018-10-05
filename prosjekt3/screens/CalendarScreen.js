import React from 'react';
import {
	View,
  	Text,
  	Button, ScrollView,
  	AsyncStorage, StyleSheet
} from 'react-native';
import * as Storage from '../components/Storage.js'
import { Calendar, CalendarList, Agenda, calendarTheme} from 'react-native-calendars';

export default class CalendarScreen extends React.Component {
	constructor(props){
        super(props);
        this.state = {
        }
      }

	static navigationOptions = {
	    title: 'Calendar',
	};


  	render() {

		return (
			<ScrollView>
			<Agenda
			items ={
				{'2018-10-01': [{text: 'Morning appointment'},{text: 'Midday appointment'},{text: 'Afternoon appointment'}],
				 '2018-10-02': [{text: 'item 2 - any js object'}],
				 '2018-10-03': [],
				 '2018-10-04': [{text: 'item 3 - any js object'},{text: 'any js object'}],
				}}
			
			renderItem={(item,firstItemInDay) => {return (<View>
														<Text style = {styles.item}>{firstItemInDay}</Text>
														<Text style = {styles.item}>{item.key}</Text>
														</View>)}}
			renderEmptyDate={() => {return (<View><Text></Text></View>);}}
			rowHasChanged={(r1, r2) => {return r1.text !== r2.text}}
			/>
			</ScrollView>
	    )
  	}
}


const styles = StyleSheet.create({
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    }
  }); 


