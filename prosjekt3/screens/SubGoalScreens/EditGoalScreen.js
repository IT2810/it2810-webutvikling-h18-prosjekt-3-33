import React from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	Button,
	StyleSheet
} from 'react-native';
import * as Storage from '../../components/Storage';
import ToggleSwitch from './ToggleSwitch.js';

//In this component, you can choose which goals to display on GoalScreen
export default class EditGoalScreen extends React.Component {
	//Initial state values; true=display component, false: not
	state = {
		goalChooser: {
			stepGoal: true,
			studyGoal: true,
			pushupsGoal: true,
		}
	}

	//Get data from navigation props
	componentDidMount(){
		this.setState({goalChooser: this.props.navigation.getParam('goalChooser')})
	}

	//Store changes to asyncstorage and update navigation state (data for the callback function)
	componentDidUpdate(prevProps, prevState){
		if(this.state.goalChooser != prevState.goalChooser){
			Storage.getGoals().then(goals => {
				goals.goalChooser = this.state.goalChooser;
				Storage.storeGoals(goals);
			});
			const { navigation } = this.props;
			navigation.state.params.onLoad({ goalChooser: this.state.goalChooser });
		}
	}
	//Functions for toggeling goal components on and of
	toggleSteps(){
		this.setState({goalChooser: {stepGoal: true}})
	}
	toggleStudy(){
		this.setState({goalChooser: {studyGoal: true}})
	}
	togglePushups(){
		this.setState({goalChooser: {pushupsGoal: true}})
	}
	setStyle(background){
		return{
			backgroundColor: background,
			width: 300,
			height: 150,
			flex: 5,
			alignItems: 'center',
			justifyContent: 'center',
			margin: 20,
		}
	}
  render() {
    return(
			//Buttons are created using the third party library "ToggleSwitch"
			<View style={styles.container}>
				<View style={styles.toggleStyle}>
					<ToggleSwitch
				    isOn={this.state.goalChooser.stepGoal}
				    onColor='green'
				    offColor='red'
				    label='Track number of steps'
				    labelStyle={{color: 'black', fontWeight: '900'}}
				    size='large'
				    onToggle={ stepGoal => {
							this.setState({
								goalChooser: {
									stepGoal: stepGoal,
									studyGoal: this.state.goalChooser.studyGoal,
									pushupsGoal: this.state.goalChooser.pushupsGoal
								},
							})
						} }
					/>;
				</View>
				<View style={styles.toggleStyle}>
					<ToggleSwitch
						isOn={this.state.goalChooser.studyGoal}
						onColor='green'
						offColor='red'
						label='Track hours of studying'
						labelStyle={{color: 'black', fontWeight: '900'}}
						size='large'
						onToggle={ studyGoal => {
							this.setState({
								goalChooser: {
									stepGoal: this.state.goalChooser.stepGoal,
									studyGoal: studyGoal,
									pushupsGoal: this.state.goalChooser.pushupsGoal
								},
							})
						} }
					/>;
				</View>
				<View>
					<ToggleSwitch
						isOn={this.state.goalChooser.pushupsGoal}
						onColor='green'
						offColor='red'
						label='Track number of pushups'
						labelStyle={{color: 'black', fontWeight: '900'}}
						size='large'
						onToggle={ pushupsGoal => {
							this.setState({
								goalChooser: {
									stepGoal: this.state.goalChooser.stepGoal,
									studyGoal: this.state.goalChooser.studyGoal,
									pushupsGoal: pushupsGoal
								},
							})
						} }
					/>;
				</View>

			</View>
    );
  }
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonText: {
		fontSize: 16,
	},
	toggleStyle: {
		marginBottom: 50
	}
})
