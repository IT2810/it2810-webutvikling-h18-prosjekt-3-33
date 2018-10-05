import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Button} from 'react-native';




const Contact = ({name}) => 
        <View>
        <TouchableOpacity onPress={() => alert(name)}>
                <Text style={styles.item}>
                {name}
                </Text>
        </TouchableOpacity>
        </View>;

export default Contact;

  const styles = StyleSheet.create({
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    }
  }); 