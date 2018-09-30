import React from 'react';
import { Alert, Text, AppRegistry, Button, StyleSheet, View, SectionList, ScrollView} from 'react-native';
import { Icon } from 'expo';

export default class ContactsScreen extends React.Component {
  static navigationOptions = {
    title: 'Contacts',
  };


  _onPressButton() {
    Alert.alert('You tapped the button!')    
  };
  
  _viewNameALert = (name) => { 
 
    Alert.alert(name)
 
  }



  render() {

    let A = ['Andreas', 'Anders', 'Anne']
    let B = ['Beate','Brith','Boss']
    let C = ['Charlie','Comrade','Coco']
    return (
      <ScrollView style={styles.container}>
      <Icon.Ionicons name='ios-add' style={styles.addButton} onPress={this._onPressButton} color="blue"/>
      <SectionList
          sections={[
            {title: 'A', data: A},
            {title: 'B', data: B},
            {title: 'C', data: C}
          ]}
          renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
          keyExtractor={(item, index) => index}
        />
      </ScrollView>

    );
  }
}


const styles = StyleSheet.create({
  container: {
   flex: 1,
  },
  buttonContainer: {
    margin: 20
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  addButton: {
    margin: 10,
    fontSize: 32,
    alignSelf: 'flex-end'

  }

}); 