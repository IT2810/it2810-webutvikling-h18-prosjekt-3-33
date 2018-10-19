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
import Slider from 'react-native-slider';

//Component for editing your goal for number of steps
export default class EditStepGoal extends React.Component {
	state = {
		stepGoal: 0,
	}
	static navigationOptions = {
		title: '',
  }
	//Setting state from navigation params
	componentDidMount(){
		this.setState({stepGoal: this.props.navigation.getParam('stepGoal', 0)})
	}
	//Storing changes to asyncstorage and updating data for navigation callback
	componentDidUpdate(prevProps, prevState){
		if(this.state.stepGoal != prevState.stepGoal){
			Storage.getGoals().then(goals => {
				goals.stepGoal = this.state.stepGoal;
				Storage.storeGoals(goals);
			});
			const { navigation } = this.props;
			navigation.state.params.onLoad({ stepGoal: this.state.stepGoal });
		}
	}
	//change state on user edit, used in slider
	changeStepGoal(newGoal){
		this.setState({stepGoal: newGoal})
	}
	render() {
		let currentGoal = this.state.stepGoal;
		return(
			//Slider created with react-native-slider
			<View style={styles.container}>
				<View style={styles.smallContainer}>
					<Text style={{padding: 10}}>Set a new goal for daily number of steps</Text>
					<Slider
          value={this.state.stepGoal}
          onValueChange={(value) => this.changeStepGoal(value)}
          minimumValue={0}
          maximumValue={20000}
          step={1000}/>
				<Text style={{fontSize: 32}}>{this.state.stepGoal}</Text>
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
		backgroundColor: '#e8fcb8',
	},
	smallContainer: {
		width: 300,
	},
	inputStyle: {
		height: 40,
	 	borderColor: 'gray',
		borderWidth: 1,
		fontSize: 32,
	}
});
