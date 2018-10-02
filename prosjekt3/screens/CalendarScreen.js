import React from 'react';
import {
	View,
  	Text,
  	Button,
  	AsyncStorage,
} from 'react-native';
import * as Storage from '../components/Storage.js'

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
	    	<View>
	    		<Text> Calendar </Text>
	    	</View>
	    )
  	}
}



