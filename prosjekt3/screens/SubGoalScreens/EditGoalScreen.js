import React from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	Button,
	StyleSheet
} from 'react-native';
import * as Storage from '../../components/Storage';
import ToggleSwitch from 'toggle-switch-react-native';

export default class EditGoalScreen extends React.Component {
	state = {
		goalChooser: {
			stepGoal: true,
			studyGoal: true,
			pushupsGoal: true,
		}
	}

	componentDidMount(){
		this.setState({goalChooser: this.props.navigation.getParam('goalChooser', null)})
	}

	componentDidUpdate(prevProps, prevState){
		if(this.state.goalChooser != prevState.goalChooser){
			const goals = Storage.getGoals();
			goals.goalChooser = this.state.goalChooser;
			Storage.storeGoals(goals);
			const { navigation } = this.props;
			navigation.state.params.onLoad({ goalChooser: this.state.goalChooser });
		}
	}

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

		const dailyStepsText = this.state.goalChooser.stepGoal
			? "Tracking daily steps: ON"
			: "Tracking daily steps: OFF";
		const hoursStudingText = this.state.goalChooser.studyGoal
			? "Tracking hours of studying: ON"
			: "Tracking hours of studying OFF";
		const pushupsText = this.state.goalChooser.pushupsGoal
			? "Tracking number of pushups: ON"
			: "Tracking number of pushups: OFF";
		const dailyStepsBackground = this.state.goalChooser.stepGoal
			? '#6be069'
			: '#dd6378';
		const hoursStudingBackground = this.state.goalChooser.studyGoal
			? '#6be069'
			: '#dd6378';
		const pushupsBackground = this.state.goalChooser.pushupsGoal
			? '#6be069'
			: '#dd6378';
    return(
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
