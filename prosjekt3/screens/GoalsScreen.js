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
		goalChooser: {
			stepGoal: true,
			studyGoal: false,
			pushupsGoal: false
		}
	}
	static navigationOptions = {
		title: 'Daily Progresss',
  };
	componentDidMount(){
		Storage.getGoals().then(goals =>{
			console.log(goals.stepGoal)
			if(goals.hasOwnProperty('stepGoal')){
				this.setState({ stepGoal: goals.stepGoal})
				console.log("Fetched goals " + goals.stepGoal)
			}else{
				goals.stepGoal = 10000;
				console.log("Set new initial stepgoal " + goals.stepGoal)
				this.setState({stepGoal: 10000})
			}
			if(goals.hasOwnProperty('studyGoal')){
				this.setState({ studyGoal: goals.studyGoal})
				console.log("Fetched studygoal " + goals.studyGoal)
			}else{
				goals.studyGoal = 5;
				this.setState({studyGoal: 5})
				console.log("Set new initial studyGoal " + goals.studyGoal)
			}
			if(goals.hasOwnProperty('pushupsGoal')){
				this.setState({ pushupsGoal: goals.pushupsGoal})
				console.log("Fetched pushupsGoal " + goals.pushupsGoal)
			}else{
				goals.pushupsGoal = 5;
				this.setState({pushupsGoal: 5})
				console.log("Set new initial pushupsGoal " + goals.pushupsGoal)
			}
			if(goals.hasOwnProperty('goalChooser')){
				this.setState({goalChooser: goals.goalChooser})
				console.log("Fetched goalChooser " + goals.goalChooser.stepGoal)
			}else{
				goals.goalChooser = {stepGoal: true, studyGoal: true, pushupsGoal: true}
				this.setState({goalChooser: goals.goalChooser})
				console.log("Set new initial goalChooser " + goals.goalChooser.stepGoal)
			}
			Storage.storeGoals(goals);
		});
	}

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

	onLoad = data => {
		this.setState(data);
	}
	onChooseLoad = data => {
		this.setState(data);
	}

  render() {
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
