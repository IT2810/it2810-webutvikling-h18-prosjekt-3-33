import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Button} from 'react-native';




const DayItem = ({day, item}) =>
        <View style={styles.container}>
            { day && <Text style={styles.dayItem}>{day.day}</Text>}
        </View>;

export default DayItem;

  const styles = StyleSheet.create({
    item: {
      fontSize: 18,
      color: 'white',

    },
    container: {
        padding: 10,
        backgroundColor: 'blue',
        margin: 5,
        display: 'flex'
    },
    dayItem: {
        fontSize: 24,
        
    }
  }); 