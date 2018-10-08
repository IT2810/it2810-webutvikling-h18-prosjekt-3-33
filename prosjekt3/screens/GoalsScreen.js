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
import StudyGoal from '../components/StudyGoal'
import * as Storage from '../components/Storage';



export default class GoalsScreen extends React.Component {
	state = {
		stepGoal: 10,
		studyGoal: 10
	}
	static navigationOptions = {
		title: 'Daily Progresss',
  };
	componentDidMount(){
		const goals = Storage.getGoals();
		if(goals.hasOwnProperty('stepGoal')){
			this.setState({ stepGoal: goals[stepGoal]})
		}else{
			goals['stepGoal'] = 10000;
			Storage.storeGoals(goals);
			this.setState({stepGoal: 10000})
		}
		if(goals.hasOwnProperty('studyGoal')){
			this.setState({ studyGoal: goals[studyGoal]})
		}else{
			goals['studyGoal'] = 5;
			Storage.storeGoals(goals);
			this.setState({studyGoal: 5})
		}
	}
	onLoad = data => {
		this.setState(data);
	}

  render() {
    return (
			<View>
				<Button title="Choose goals"
					onPress={() => this.props.navigation.navigate('EditGoals')} />
				<TouchableOpacity onPress={() =>this.props.navigation.navigate('EditStep', {stepGoal: this.state.stepGoal.toString(), onLoad: this.onLoad})}>
					<StepGoal stepGoal={this.state.stepGoal}/>
				</TouchableOpacity>
				<TouchableOpacity onPress={() =>this.props.navigation.navigate('EditStudy', {studyGoal: this.state.studyGoal, onLoad: this.onLoad})}>
					<StudyGoal studyGoal={this.state.studyGoal} />
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
