import React from 'react';
import {Modal, Alert, Text,TouchableHighlight,StyleSheet, View, SectionList, ScrollView} from 'react-native';
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
      {title: 'C', data: ['Charlie','Comrade','Coco']},
    ]

    };

  }

  setModalVisible(bool) {
    this.setState({modalVisible: bool});
  }


  addContact = (name) => {
    Alert.alert("Added contact: ", name); //alert user with the added name
    firstLetter = name[0].toUpperCase() //Uppercase the first letter in name
    sections = this.state.sections; // copy state
    let titles = []
  
    for(const [key,value] in Object.entries(sections)){ //iterating through object entries
      if(sections[key]['title'] == firstLetter){ // If first letter in name has a title in sections
        sections[key]['data'].push(name) //add name value to sections copy
        this.setState({sections}); // update state for rerendering, and updated contact 
        }
      titles.push(sections[key]['title']) //append all titles to titles list
      }
  
  if(!titles.includes(firstLetter)){ //if titles doesnt contain firstLetter
    //Create new dict object, with firstletter and name
    let obj = {
      "title": firstLetter,
      "data": [name]
    }
    sections.push(obj)//push to sections copy and update state
    this.setState({sections});
  }
  sections.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0)); //sort sections by Title
  this.setState({sections}); // update state with sorted sections
  

    
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