import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, Button, TouchableOpacity

} from 'react-native';
import Colors from '../constants/Colors.js';
import PedometerCounter from './PedometerCounter';

//component for managing pedometer counter and goal for number of steps
export default class StepGoal extends React.Component {
  state = {
    stepGoal: 0,
  }
  //Setting state from parent props (GoalScreen)
  componentDidMount(){
    this.setState({stepGoal: this.props.stepGoal})
  }
  //Setting new goal to state on changes
  componentDidUpdate(prevProps, prevState){
    if(this.props.stepGoal != prevProps.stepGoal){
      this.setState({stepGoal: this.props.stepGoal})
    }
  }
  //Renders the PedometerCounter component and passing stepgoal as props
  render() {
    return(
      <ScrollView style={styles.container}>
        <View style={styles.goalContainer}>
          <Text style={styles.goalTitle}>Number of steps last 24 hours </Text>
          <PedometerCounter stepGoal={this.state.stepGoal} />
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  goalTitle: {
    fontSize: 16,
    color: 'white',
  },
  goalContainer: {
    backgroundColor: Colors.goalComponentOne,
    height: 150,
    padding: 10,
    marginTop: 20
  },
  container: {
    padding: 20
  },
  emptyContainer: {
    height: 80
  }

});
