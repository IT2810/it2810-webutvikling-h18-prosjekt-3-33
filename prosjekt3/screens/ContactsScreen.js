import React from 'react';
import {Modal, Alert, Text,TouchableOpacity,TouchableHighlight,StyleSheet, View, SectionList, ScrollView} from 'react-native';
import { Icon } from 'expo';
import * as Storage from '../components/Storage';

import AddContactScreen from './SubContactScreens/AddContactScreen';
import Contact from './SubContactScreens/Contact';

export default class ContactScreen extends React.Component {

  static navigationOptions = {
    title: 'Contacts',
  };
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      sections: [
    ]

    };

  }

  setModalVisible = (bool) => {
    this.setState({modalVisible: bool});
  }

  componentDidMount(){
   Storage.getContacts().then(contacts => contacts.map(contact => {
       contact['data'].map(obj => this.addContact(obj.name,obj.email,obj.number))
   }));
  }
  



  addContact = (name,email,number) => {
    firstLetter = name[0].toUpperCase() //Uppercase the first letter in name
    sections = this.state.sections; // copy state
    let titles = []
  
    for(const [key,value] in Object.entries(sections)){ //iterating through object entries
      if(sections[key]['title'] == firstLetter){ // If first letter in name has a title in sections
        sections[key]['data'].push({
          name: name,
          email: email,
          number: number
        }) //add name value to sections copy
        this.setState({sections}); // update state for rerendering, and updated contact 
        }
      titles.push(sections[key]['title']) //append all titles to titles list
      }
  
  if(!titles.includes(firstLetter)){ //if titles doesnt contain firstLetter
    //Create new dict object, with firstletter and name
    
    let obj = {
      title: firstLetter,
      data: [{
        name: name,
        email: email,
        number: number
      }],
    }
    sections.push(obj)//push to sections copy and update state
    this.setState({sections});
  }
  sections.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0)); //sort sections by Title
  this.setState({sections}); // update state with sorted sections
  Storage.storeContacts(sections);

    
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
            this.setModalVisible(false);
          }}>
          <View style={{marginTop: 50}}>
            <View>
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text style={styles.closeButton}>Close</Text>
              </TouchableHighlight>
              <AddContactScreen setModalVisible={this.setModalVisible} addContact={this.addContact}/>
            </View>

          </View>
        </Modal>
      </View>
      <SectionList
          sections={this.state.sections}
          renderItem={({item}) => <Contact item={item}/>}
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