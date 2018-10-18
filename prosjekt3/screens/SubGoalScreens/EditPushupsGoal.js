import React from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	Button,
	StyleSheet,
	TextInput
} from 'react-native';
import * as Storage from '../../components/Storage';
import Slider from 'react-native-slider';


export default class EditPushupsGoal extends React.Component {
	state = {
		pushupsGoal: 0,
	}
	static navigationOptions = {
		title: '',
  }
	componentDidMount(){
		this.setState({pushupsGoal: this.props.navigation.getParam('pushupsGoal', 0)})
	}
	componentDidUpdate(prevProps, prevState){
		if(this.state.pushupsGoal != prevState.pushupsGoal){
			Storage.getGoals().then(goals => {
				goals['pushupsGoal'] = Number(this.state.pushupsGoal);
				Storage.storeGoals(goals);
			});
			const { navigation } = this.props;
			navigation.state.params.onLoad({ pushupsGoal: this.state.pushupsGoal });
		}
	}
	changePushupsGoal(newGoal){
		this.setState({pushupsGoal: newGoal})
	}
	render() {
		let currentGoal = this.state.pushupsGoal;
		return(

			<View style={styles.container}>
				<View style={styles.smallContainer}>
					<Text>Set a new goal for daily number of pushups </Text>
          <Slider
          value={this.state.pushupsGoal}
          onValueChange={(value) => this.changePushupsGoal(value)}
          minimumValue={0}
          maximumValue={30}
          step={1}/>
				<Text style={{fontSize: 32}}>{this.state.pushupsGoal}</Text>
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
