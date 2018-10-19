import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, Button, TouchableOpacity

} from 'react-native';
import Colors from '../constants/Colors.js';
import PushupsCounter from './PushupsCounter';

//Component for managing pushups counter and pushups goal
export default class PushupsGoal extends React.Component {
  state = {
    pushupsGoal: 0,
  }
  // setting state from parent props (GoalScreen)
  componentDidMount(){
    this.setState({pushupsGoal: this.props.pushupsGoal})
  }

  componentDidUpdate(prevProps, prevState){
    if(this.props.studyGoal != prevProps.studyGoal){
      this.setState({pushupsGoal: this.props.pushupsGoal})
    }
  }
  //Renders pushupscounter and passing goal as props
  render() {
    return(
      <ScrollView style={styles.container}>
        <View style={styles.goalContainer}>
          <Text style={styles.goalTitle}>Number of pushups today </Text>
          <PushupsCounter pushupsGoal={this.props.pushupsGoal} />
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
