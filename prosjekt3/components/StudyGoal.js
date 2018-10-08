import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, Button, TouchableOpacity

} from 'react-native';
import Colors from '../constants/Colors.js';
import PedometerCounter from './PedometerCounter';
import StudyCounter from './StudyCounter';

export default class StepGoal extends React.Component {
  state = {
    studyGoal: 0,
  }
  componentDidMount(){
    this.setState({studyGoal: this.props.studyGoal})
  }
  componentDidUpdate(prevProps, prevState){
    if(this.props.studyGoal != prevProps.studyGoal){
      this.setState({studyGoal: this.props.studyGoal})
    }
  }
  render() {
    return(
      <ScrollView style={styles.container}>
        <View style={styles.goalContainer}>
          <Text style={styles.goalTitle}>Number of hours studied today </Text>
          <StudyCounter studyGoal={this.props.studyGoal} />
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
