import React from 'react';
import {
  View, Text, StyleSheet, ScrollView

} from 'react-native';
import Colors from '../constants/Colors.js';
import PedometerCounter from './PedometerCounter';

export default class Goal extends React.Component {
  render() {
    return(
      <ScrollView style={styles.container}>
        <View style={styles.goalContainer}>
          <Text style={styles.goalTitle}>Number of steps</Text>
          <PedometerCounter />
        </View>
        <View style={styles.goalContainer}>
          <Text style={styles.goalTitle}>Hours of studing</Text>
        </View>
        <View style={styles.goalContainer}>
          <Text style={styles.goalTitle}>Number of movies watched</Text>
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
