import React from 'react';
import Expo from 'expo';
import { Pedometer } from 'expo';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import * as Storage from './Storage';
import Colors from '../constants/Colors';

export default class PedometerCounter extends React.Component {
  state = {
    pastStudyCount: 0,
    currentStudyCount: 0,
    studyGoal: 5,
  };
  componentDidMount() {
    this.setState({
      studyGoal: this.props.studyGoal
    })
  }
  componentDidUpdate(prevProps, prevState){
    if(this.props.studyGoal != prevProps.studyGoal){
      this.setState({studyGoal: this.props.studyGoal})
    }
  }


  render() {
    var totalProgress = this.state.pastStudyCount + this.state.currentStudyCount;
    var goal = this.state.studyGoal;
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <View style={styles.minusButtonContainer}>
            <Button
              title="-"
              onPress={() => this.setState({currentStudyCount: this.state.currentStudyCount-1})} />
          </View>
          <Text>
            {totalProgress} out of {goal}
          </Text>
          <View style={styles.buttonContainer}>
            <Button
              title="+"
              onPress={() => this.setState({currentStudyCount: this.state.currentStudyCount+1})}
              style={styles.plusButton}/>
          </View>
        </View>
        <View style={styles.progressBar}>
          <View style={progressBarStyle(totalProgress, goal)}>
          </View>
        </View>

      </View>
    );
  }
}
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
    marginTop: 20,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300,
  },
  plussButton: {
    backgroundColor: '#2db747',
    fontSize: 25,
  },
  buttonContainer: {
    backgroundColor: '#15c129',
    height: 40,
    width: 40,
  },
  minusButtonContainer: {
    backgroundColor: '#c11537',
    height: 40,
    width: 40,
  }
});