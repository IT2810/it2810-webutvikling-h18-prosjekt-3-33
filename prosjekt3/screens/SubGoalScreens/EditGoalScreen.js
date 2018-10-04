import React from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	Button,
	StyleSheet
} from 'react-native';


export default class EditGoalScreen extends React.Component {
	state = {
		dailyStepsToggle: true,
		studyHoursToggle: false,
		moviesToggle: false,
	}

	_onDailyStepsPress(){
		const newState = !this.state.dailyStepsToggle;
		this.setState({dailyStepsToggle: newState})
	}
	_onHoursStudyingPress(){
		const newState = !this.state.studyHoursToggle;
		this.setState({studyHoursToggle: newState})
	}
	_onMoviesPress(){
		const newState = !this.state.moviesToggle;
		this.setState({moviesToggle: newState})
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

		const dailyStepsText = this.state.dailyStepsToggle
			? "Tracking daily steps: ON"
			: "Tracking daily steps: OFF";
		const hoursStudingText = this.state.studyHoursToggle
			? "Tracking hours of studying: ON"
			: "Tracking hours of studying OFF";
		const moviesText = this.state.moviesToggle
			? "Tracking daily steps: ON"
			: "Tracking daily steps: OFF";
		const dailyStepsBackground = this.state.dailyStepsToggle
			? '#6be069'
			: '#dd6378';
		const hoursStudingBackground = this.state.studyHoursToggle
			? '#6be069'
			: '#dd6378';
		const moviesBackground = this.state.moviesToggle
			? '#6be069'
			: '#dd6378';
    return(
			<View style={styles.container}>
				<TouchableOpacity
					title="Number of steps"
					onPress={() => this._onDailyStepsPress()}
					style={this.setStyle(dailyStepsBackground)}
					>
						<Text style={styles.buttonText}>{dailyStepsText}</Text>
				</TouchableOpacity>
				<TouchableOpacity
					title="Number of steps"
					onPress={() => this._onHoursStudyingPress()}
					style={this.setStyle(hoursStudingBackground)}
					>
						<Text style={styles.buttonText}>{hoursStudingText}</Text>
				</TouchableOpacity>
				<TouchableOpacity
					title="Number of steps"
					onPress={() => this._onMoviesPress()}
					style={this.setStyle(moviesBackground)}
					>
						<Text style={styles.buttonText}>{moviesText}</Text>
				</TouchableOpacity>
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
})
