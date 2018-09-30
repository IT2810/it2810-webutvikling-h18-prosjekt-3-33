import React from 'react';
import {
	View,
  	Text
} from 'react-native';

export default class ContactsScreen extends React.Component {
  static navigationOptions = {
    title: 'Contacts',
  };

  render() {
    return (
    	<View>
    		<Text> Contacts screen </Text>;
    	</View>

    )
  }
}
