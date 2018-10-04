import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, Button, TouchableOpacity

} from 'react-native';
import Colors from '../constants/Colors.js';
import PedometerCounter from './PedometerCounter';

export default class StepGoal extends React.Component {
  state = {
    stepGoal: 0,
  }
  componentDidMount(){
    this.setState({stepGoal: this.props.stepGoal})
  }
  componentDidUpdate(prevProps, prevState){
    if(this.props.stepGoal != prevProps.stepGoal){
      this.setState({stepGoal: this.props.stepGoal})
    }
  }
  render() {
    return(
      <ScrollView style={styles.container}>
        <View style={styles.goalContainer}>
          <Text style={styles.goalTitle}>Number of steps {this.props.stepGoal} </Text>
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
    backgroundColor: Colors.unfinishedGoalColor,
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
