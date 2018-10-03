import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableHighlight,
	PropTypes,
	Button,
	TouchableOpacity
} from 'react-native';
import StepGoal from '../components/StepGoal';


export default class GoalsScreen extends React.Component {
	state = {
		stepGoal: 10000,
	}
	static navigationOptions = {
		title: 'Daily Progresss',
  };
  render() {
    return (
			<View>
				<Button title="Choose goals"
					onPress={() => this.props.navigation.navigate('EditGoals')} />
				<TouchableOpacity onPress={() =>this.props.navigation.navigate('EditStep', {foo:'foo'})}>
					<StepGoal stepGoal={this.state.stepGoal}/>
				</TouchableOpacity>

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
