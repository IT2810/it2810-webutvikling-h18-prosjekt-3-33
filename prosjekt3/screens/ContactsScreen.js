import React from 'react';
import {Modal, Alert, Text,TouchableHighlight, AppRegistry, Button, StyleSheet, View, SectionList, ScrollView} from 'react-native';
import { Icon } from 'expo';

import AddContactScreen from './AddContactScreen';

export default class ContactScreen extends React.Component {

  static navigationOptions = {
    title: 'Contacts',
  };
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      sections: [
      {title: 'A', data: ['Andreas', 'Anders', 'Anne']},
      {title: 'B', data: ['Beate','Brith','Boss']},
      {title: 'C', data: ['Charlie','Comrade','Coco']}
    ]

    };

  }

  setModalVisible(bool) {
    this.setState({modalVisible: bool});
  }


  addContact = (name) => {
    Alert.alert("Added contact: ", name);
    firstLetter = name[0].toUpperCase()
    sections = this.state.sections;

    for(const [key,value] in Object.entries(sections)){
      if(sections[key]['title'] == firstLetter){
        console.log(sections[key])
        sections[key]['data'].push(name)
        console.log(sections[key]['data'])
        this.setState({sections});
        }
      }
    
  }

  render() {

    return (
      <ScrollView style={styles.container}>
      <Icon.Ionicons name='ios-add' style={styles.addButton} onPress={() =>{
        this.setModalVisible(!this.state.showModal)
      }} color="blue"/>
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 50}}>
            <View>
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text style={styles.closeButton}>Close</Text>
              </TouchableHighlight>
              <AddContactScreen addContact={this.addContact}/>
            </View>

          </View>
        </Modal>
      </View>
      <SectionList
          sections={this.state.sections}
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
  },
  closeButton: {
    margin: 10,
    fontSize: 32,
    alignSelf: 'flex-end',
    color: "blue"
  }

}); 