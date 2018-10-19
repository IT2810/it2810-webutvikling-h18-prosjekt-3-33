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

//Component for editing goal for number of study hours per day
export default class EditStudyGoal extends React.Component {
	state = {
		studyGoal: 0,
		foo: 'yo'
	}
	static navigationOptions = {
		title: '',
  }
	//setting state from navigation params
	componentDidMount(){
		this.setState({studyGoal: this.props.navigation.getParam('studyGoal', 0)})
	}

	//storing changes to asyncstorage and updating data for navigation callback
	componentDidUpdate(prevProps, prevState){
		if(this.state.studyGoal != prevState.studyGoal){
			Storage.getGoals().then(goals => {
				goals['studyGoal'] = Number(this.state.studyGoal);
				Storage.storeGoals(goals);
			});
			const { navigation } = this.props;
			navigation.state.params.onLoad({ studyGoal: this.state.studyGoal });
		}
	}
	//set state on user interaction with slider
	changeStudyGoal(newGoal){
		this.setState({studyGoal: newGoal})
	}
	render() {
		let currentGoal = this.state.studyGoal;
		return(
			//slider rendered with react-native-slider
			<View style={styles.container}>
				<View style={styles.smallContainer}>
					<Text>Set a new goal for daily hours of studying </Text>
          <Slider
          value={this.state.studyGoal}
          onValueChange={(value) => this.changeStudyGoal(value)}
          minimumValue={0}
          maximumValue={8}
          step={1}/>
				<Text style={{fontSize: 32}}>{this.state.studyGoal}</Text>
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
		width: '80%',
    alignItems: "stretch",
	}
});
