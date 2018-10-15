import React from 'react';
import {
	View,
	ScrollView,
	Text,
	StyleSheet,
	TouchableHighlight,
	PropTypes,
	Button,
	TouchableOpacity
} from 'react-native';
import StepGoal from '../components/StepGoal';
import StudyGoal from '../components/StudyGoal';
import PushupsGoal from '../components/PushupsGoal';
import * as Storage from '../components/Storage';



export default class GoalsScreen extends React.Component {
	state = {
		stepGoal: 10,
		studyGoal: 10,
		pushupsGoal: 10,
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
		if(goals.hasOwnProperty('pushupsGoal')){
			this.setState({ pushupsGoal: goals[pushupsGoal]})
		}else{
			goals['pushupsGoal'] = 5;
			Storage.storeGoals(goals);
			this.setState({pushupsGoal: 5})
		}
	}
	onLoad = data => {
		this.setState(data);
	}

  render() {
    return (
			<ScrollView style={styles.container}>
				<Button
					title="Choose goals"
					onPress={() => this.props.navigation.navigate('EditGoals')}/>
				<TouchableOpacity style={styles.goalView} onPress={() =>this.props.navigation.navigate('EditStep', {stepGoal: this.state.stepGoal, onLoad: this.onLoad})}>
					<StepGoal stepGoal={this.state.stepGoal}/>
				</TouchableOpacity>
				<TouchableOpacity style={styles.goalView} onPress={() =>this.props.navigation.navigate('EditStudy', {studyGoal: this.state.studyGoal, onLoad: this.onLoad})}>
					<StudyGoal studyGoal={this.state.studyGoal} />
				</TouchableOpacity>
				<TouchableOpacity style={styles.goalView} onPress={() =>this.props.navigation.navigate('EditPushups', {pushupsGoal: this.state.pushupsGoal, onLoad: this.onLoad})}>
					<PushupsGoal pushupsGoal={this.state.pushupsGoal} />
				</TouchableOpacity>	
			</ScrollView>
		);
  }

}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
	},
	goalView: {
		marginBottom: -40,
	},
});
