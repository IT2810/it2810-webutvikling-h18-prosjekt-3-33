import React from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	Button,
	StyleSheet,
	TextInput
} from 'react-native';
import PedometerCounter from '../../components/PedometerCounter';
import StepGoal from '../../components/StepGoal'


export default class EditStepGoal extends React.Component {
	static navigationOptions = {
		title: '',
  };
	state = {
		stepGoal: '11000',
	}

	changeStepGoal(newGoal){
		this.setState({stepGoal: newGoal})
	}
	render() {
		let currentGoal = this.state.stepGoal;
		let supertest = this.props.navigation.getParam('foo': 'not foo');
		return(

			<View style={styles.container}>
				<View style={styles.smallContainer}>
					<Text>Set a new goal for daily number of steps {supertest}</Text>
					<TextInput
	        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
	        onChangeText={(text) => this.changeStepGoal(text)}
	        value={this.state.stepGoal}
		      />
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#bbb',
	},
	smallContainer: {
		width: 300,
	}
});
