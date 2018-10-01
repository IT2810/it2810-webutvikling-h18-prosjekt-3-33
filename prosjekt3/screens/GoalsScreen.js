import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableHighlight,
	PropTypes,
	Button
} from 'react-native';
import Goal from '../components/Goal';


export default class GoalsScreen extends React.Component {

	static navigationOptions = {
		title: 'Goals',
  };
  render() {
    return (
			<View>
				<Button title="Choose goals"
					onPress={() => this.props.navigation.navigate('EditGoals')} />
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
	},
	something: {
		marginTop: 100
	}
});
