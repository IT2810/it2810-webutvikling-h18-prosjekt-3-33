import React from 'react';
import Expo from 'expo';
import { Pedometer } from 'expo';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as Storage from './Storage';
import Colors from '../constants/Colors';

//Pedometer component used by StepGoal to get step data from core motion (iOS) or
//Google Fit (Android)
export default class PedometerCounter extends React.Component {
  state = {
    isPedometerActive: "checking",
    pastStepCount: 0,
    currentStepCount: 0,
    stepGoal: 0,
  };
  //Subscribe to pedometer count and setting state from props (from StepGoal)
  componentDidMount() {
    this._subscribe();
    this.setState({
      stepGoal: this.props.stepGoal
    })
  }
  //Unsubscribe from pedometer count on unmount
  componentWillUnmount() {
    this._unsubscribe();
  }
  //State changes on new props from StepGoal
  componentDidUpdate(prevProps, prevState){
    if(this.props.stepGoal != prevProps.stepGoal){
      this.setState({stepGoal: this.props.stepGoal})
    }
  }
//Subscribing to Core Motion and Google FIt
  _subscribe = () => {
    this._subscription = Pedometer.watchStepCount(result => {
      this.setState({
        currentStepCount: result.steps
      });
    });

    Pedometer.isAvailableAsync().then(
      result => {
        this.setState({
          isPedometerActive: String(result)
        });
      },
      error => {
        this.setState({
          isPedometerActive: "Could not get isPedometerActive: " + error
        });
      }
    );

    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 1);
    Pedometer.getStepCountAsync(start, end).then(
      result => {
        this.setState({ pastStepCount: result.steps });
      },
      error => {
        this.setState({
          pastStepCount: "Could not get stepCount: " + error
        });
      }
    );
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  render() {
    //Renders a progress bar based on progress / goal relationship
    var totalProgress = this.state.pastStepCount + this.state.currentStepCount;
    var goal = this.state.stepGoal;
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text>
            {totalProgress} out of {goal}
          </Text>
        </View>
        <View style={styles.progressBar}>
          <View style={progressBarStyle(totalProgress, goal)}>
          </View>
        </View>

      </View>
    );
  }
}
//Function for calculating the progressbar colors and width
progressBarStyle = function(progress, goal){
  let progressWidth = 0;
  let backgroundColor = '#000';
  let progressGoalRelation = progress/goal;
  if(progressGoalRelation>=1){
    progressWidth = 1;
    backgroundColor = '#75CDA8';
  }
  if (progressGoalRelation < 1 && progressGoalRelation > 0.4){
    progressWidth = progressGoalRelation;
    backgroundColor = '#EDBF2C';
  }
  if(progressGoalRelation<=0.4){
    progressWidth = progressGoalRelation;
    backgroundColor = '#DB0200';
  }
  return{
    flex: progressWidth,
    backgroundColor: backgroundColor,
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center"
  },
  progressBar: {
    flex: 1,
    flexDirection: 'row',
    width: 300,
    height: 20,
    backgroundColor: '#eee',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    width: 300,
  }
});

Expo.registerRootComponent(PedometerCounter);
