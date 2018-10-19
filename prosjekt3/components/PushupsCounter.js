import React from 'react';
import Expo from 'expo';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import * as Storage from './Storage';
import Colors from '../constants/Colors';

export default class PushupsCounter extends React.Component {
  state = {
    pastPushupsCount: 0,
    currentPushupsCount: 0,
    pushupsGoal: 5
  };
  componentDidMount() {
    this.setState({
      pushupsGoal: this.props.pushupsGoal,
    })
    Storage.getGoals().then(goals =>{
      if(goals.hasOwnProperty('pushupsCount')){
        this.setState({pastPushupsCount: goals.pushupsCount})
      }else{
        goals.pushupsCount = 0;
        Storage.storeGoals(goals);
      }
    });
  }
  componentDidUpdate(prevProps, prevState){
    if(this.props.pushupsGoal != prevProps.pushupsGoal){
      this.setState({pushupsGoal: this.props.pushupsGoal})
    }
    if(this.state != prevState){
      Storage.getGoals().then(goals =>{
        goals.pushupsCount = this.state.pastPushupsCount + this.state.currentPushupsCount;
        Storage.storeGoals(goals);
      });
    }
  }

  decrementCounter(totalProgress){
    this.setState({
      currentPushupsCount: (totalProgress-1 < 0)
        ? this.state.currentPushupsCount
        : this.state.currentPushupsCount-1
    })
  }

  incrementCounter(){
    this.setState({currentPushupsCount: this.state.currentPushupsCount+1})
  }

  progressBarStyle(progress, goal){
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

  render() {
    var totalProgress = this.state.pastPushupsCount + this.state.currentPushupsCount;
    var goal = this.state.pushupsGoal;
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <View style={styles.minusButtonContainer}>
            <Button
              title="-"
              onPress={() => this.decrementCounter(totalProgress)} />
          </View>
          <Text>
            {totalProgress} out of {goal}
          </Text>
          <View style={styles.buttonContainer}>
            <Button
              title="+"
              onPress={() => this.incrementCounter()}
              style={styles.plusButton}/>
          </View>
        </View>
        <View style={styles.progressBar}>
          <View style={this.progressBarStyle(totalProgress, goal)}>
          </View>
        </View>

      </View>
    );
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
