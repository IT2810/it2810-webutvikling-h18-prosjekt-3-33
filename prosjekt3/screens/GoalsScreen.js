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

//This is the main component for the goals page
export default class GoalsScreen extends React.Component {
// Setting initial state
	state = {
		stepGoal: 10,
		studyGoal: 10,
		pushupsGoal: 10,
		goalChooser: {
			stepGoal: true,
			studyGoal: false,
			pushupsGoal: false
		}
	}
	// Title for navigation stack
	static navigationOptions = {
		title: 'Daily Progresss',
  };

	//Check if localstorage already has data, else create default values
	componentDidMount(){
		Storage.getGoals().then(goals =>{
			if(goals.hasOwnProperty('stepGoal')){
				this.setState({ stepGoal: goals.stepGoal})
			}else{
				goals.stepGoal = 10000;
				this.setState({stepGoal: 10000})
			}
			if(goals.hasOwnProperty('studyGoal')){
				this.setState({ studyGoal: goals.studyGoal})
			}else{
				goals.studyGoal = 5;
				this.setState({studyGoal: 5})
			}
			if(goals.hasOwnProperty('pushupsGoal')){
				this.setState({ pushupsGoal: goals.pushupsGoal})
			}else{
				goals.pushupsGoal = 5;
				this.setState({pushupsGoal: 5})
			}
			if(goals.hasOwnProperty('goalChooser')){
				this.setState({goalChooser: goals.goalChooser})
			}else{
				goals.goalChooser = {stepGoal: true, studyGoal: true, pushupsGoal: true}
				this.setState({goalChooser: goals.goalChooser})
			}
			Storage.storeGoals(goals);
		});
	}

	//store changes to asyncstorage
	componentDidUpdate(prevProps, prevState){
		if(prevState != this.state){
			Storage.getGoals().then(goals =>{
				goals.stepGoal = this.state.stepGoal;
				goals.studyGoal = this.state.studyGoal;
				goals.pushupsGoal = this.state.pushupsGoal;
				goals.goalChooser = this.state.goalChooser;
				Storage.storeGoals(goals);
			});
		}
	}

	//Callback functions for navigation params
	onLoad = data => {
		this.setState(data);
	}
	onChooseLoad = data => {
		this.setState(data);
	}

  render() {
		//Creating views as const to enable conditional rendering based on goalChooser
		//The navigate is passed data and callback function
		const stepComponent = (
			<TouchableOpacity style={styles.goalView} onPress={() =>this.props.navigation.navigate('EditStep', {stepGoal: this.state.stepGoal, onLoad: this.onLoad})}>
				<StepGoal stepGoal={this.state.stepGoal}/>
			</TouchableOpacity>
		);
		const studyComponent = (
			<TouchableOpacity style={styles.goalView} onPress={() =>this.props.navigation.navigate('EditStudy', {studyGoal: this.state.studyGoal, onLoad: this.onLoad})}>
				<StudyGoal studyGoal={this.state.studyGoal}/>
			</TouchableOpacity>
		);
		const pushupsComponent = (
			<TouchableOpacity style={styles.goalView} onPress={() =>this.props.navigation.navigate('EditPushups', {pushupsGoal: this.state.pushupsGoal, onLoad: this.onLoad})}>
				<PushupsGoal pushupsGoal={this.state.pushupsGoal} />
			</TouchableOpacity>
		);
    return (
			<ScrollView style={styles.container}>
				<Button
					title="Choose goals"
					onPress={() => this.props.navigation.navigate('EditGoals',
						{goalChooser: this.state.goalChooser, onLoad: this.onChooseLoad})}/>
				{this.state.goalChooser.stepGoal ? stepComponent : null}
				{this.state.goalChooser.studyGoal ? studyComponent : null}
				{this.state.goalChooser.pushupsGoal ? pushupsComponent : null}
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
