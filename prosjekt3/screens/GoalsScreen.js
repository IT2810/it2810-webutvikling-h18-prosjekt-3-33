import React from 'react';
import {
	View,
	Text,
	StyleSheet
} from 'react-native';
import Goal from '../components/Goal';


export default class GoalsScreen extends React.Component {
  static navigationOptions = {
    title: 'Goals',
  };

  render() {
    return (

		<View style={styles.container}>
			<Text style={styles.title}> Goals </Text>
			<Goal />
		</View>

    );
  }
}

const styles = StyleSheet.create({
	container: {
		borderRadius: 3
	},
	title: {
		fontSize: 24
	}
});
