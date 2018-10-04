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
import * as Storage from '../../components/Storage';


export default class EditStepGoal extends React.Component {
	state = {
		stepGoal: '0',
		foo: 'yo'
	}
	static navigationOptions = {
		title: '',
  }
	componentDidMount(){
		this.setState({stepGoal: this.props.navigation.getParam('stepGoal', 0)})
	}
	componentDidUpdate(prevProps, prevState){
		if(this.state.stepGoal != prevState.stepGoal){
			const goals = Storage.getGoals();
			goals['stepGoal'] = Number(this.state.stepGoal);
			Storage.storeGoals(goals);
			const { navigation } = this.props;
			navigation.state.params.onLoad({ stepGoal: this.state.stepGoal });
		}
	}
	changeStepGoal(newGoal){
		this.setState({stepGoal: newGoal})
	}
	render() {
		let currentGoal = this.state.stepGoal;
		let supertest = this.state.foo;
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
