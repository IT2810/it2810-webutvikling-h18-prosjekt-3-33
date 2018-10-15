import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Button} from 'react-native';




const Contact = ({item}) => 
        <View>
        <TouchableOpacity onPress={() => alert("Name: " + item.name  + "\n" + "Email: "  + item.email + "\n" + "Phone Number: " + item.number)}>
                <Text style={styles.item}>
                {item.name}
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