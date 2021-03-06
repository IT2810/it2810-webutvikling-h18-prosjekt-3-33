import React from 'react';
import Expo from 'expo';
import { Pedometer } from 'expo';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import * as Storage from './Storage';
import Colors from '../constants/Colors';

//Counter component for number of hours of studying, used by StudyGoal component
export default class StudyCounter extends React.Component {
  state = {
    pastStudyCount: 0,
    currentStudyCount: 0,
    studyGoal: 5
  };
  //Fetching data from props and checking asyncstorage for previous data, else
  //initialize new data post
  componentDidMount() {
    this.fetchProps();
    Storage.getGoals().then(goals =>{
      if(goals.hasOwnProperty('studyCount')){
        this.setState({pastStudyCount: goals.studyCount})
      }else{
        this.setState({pastStudyCount: 0})
        goals.studyCount = 0;
        Storage.storeGoals(goals);
      }
    });
  }
  //Function used by componentDidMount for setting state from props
  fetchProps(){
    this.setState({
      studyGoal: this.props.studyGoal,
    })
  }
  //Storing changes to asyncstorage and updating state
  componentDidUpdate(prevProps, prevState){
    if(this.props.studyGoal != prevProps.studyGoal){
      this.setState({studyGoal: this.props.studyGoal})
    }
    if(this.state != prevState){
      Storage.getGoals().then(goals =>{
        goals.studyCount = this.state.pastStudyCount + this.state.currentStudyCount;
        Storage.storeGoals(goals);
      });
    }

  }
//Function for decrementing the counter
  decrementCounter(totalProgress){
    this.setState({
      currentStudyCount: (totalProgress-1 < 0)
        ? this.state.currentStudyCount
        : this.state.currentStudyCount-1
    })
  }
//Function for incrementing the counter
  incrementCounter(totalProgress){
    this.setState({currentStudyCount: this.state.currentStudyCount+1})
  }
//Function for calculating progressbar colors and width
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
    return({
      flex: progressWidth,
      backgroundColor: backgroundColor,
    });
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
              onPress={() => this.decrementCounter(totalProgress)} />
          </View>
          <Text>
            {totalProgress} out of {goal}
          </Text>
          <View style={styles.buttonContainer}>
            <Button
              title="+"
              onPress={() => this.incrementCounter(totalProgress)}
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
