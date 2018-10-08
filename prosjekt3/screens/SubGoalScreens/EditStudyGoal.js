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


export default class EditStudyGoal extends React.Component {
	state = {
		studyGoal: 0,
		foo: 'yo'
	}
	static navigationOptions = {
		title: '',
  }
	componentDidMount(){
		this.setState({studyGoal: this.props.navigation.getParam('studyGoal', 0)})
	}
	componentDidUpdate(prevProps, prevState){
		if(this.state.studyGoal != prevState.studyGoal){
			const goals = Storage.getGoals();
			goals['studyGoal'] = Number(this.state.studyGoal);
			Storage.storeGoals(goals);
			const { navigation } = this.props;
			navigation.state.params.onLoad({ studyGoal: this.state.studyGoal });
		}
	}
	changeStudyGoal(newGoal){
		this.setState({studyGoal: newGoal})
	}
	render() {
		let currentGoal = this.state.studyGoal;
		return(

			<View style={styles.container}>
				<View style={styles.smallContainer}>
					<Text>Set a new goal for daily number of steps </Text>
          <Text>{this.state.studyGoal}</Text>
          <Slider
          value={this.state.studyGoal}
          onValueChange={(value) => this.changeStudyGoal(value)}
          minimumValue={0}
          maximumValue={8}
          step={0.5}/>
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
		width: '80%',
    alignItems: "stretch",
	}
});
