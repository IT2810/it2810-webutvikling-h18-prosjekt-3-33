import React from 'react';
import { Alert, TextInput,StyleSheet, View, Button} from 'react-native';
import { Constants } from 'expo';


export default class AddContactScreen extends React.Component {
    state = {
        name: '',
        email: '',
        phone: ''
      };

    render() {
  
      return (
          <View>
            <TextInput
                style={styles.input}
                value={this.state.name}
                onChangeText={name => this.handleNameChange(name)}
                ref={ref => {this._nameInput = ref}}
                placeholder="Full Name"
                autoCapitalize="words"
                keyboardType="default"
                returnKeyType="next"
                onSubmitEditing={this._next}
                blurOnSubmit={false}
            />
            <TextInput
                style={styles.input}
                value={this.state.email}
                onChangeText={email => this.handleEmailChange(email)}
                placeholder="email@example.com"
                />
            <TextInput
                style={styles.input}
                value={this.state.phone}
                onChangeText={phone => this.handleNumberChange(phone)}
                keyboardType="default"
                placeholder="Phone number"
            />

            <Button title="Add contact" onPress={this._submit}></Button>
          </View>

          
  
      );
    }
      
      _submit = () => {
        Alert.alert("Added contact: ", this.state.name);
        this.props.addContact(this.state.name, this.state.email, this.state.phone);

      };

      handleNameChange = (name) => {
        this.setState({name})
      }
      handleEmailChange = (email) => {
        this.setState({email})
      }
      handleNumberChange = (number) => {
        this.setState({number})
      }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ecf0f1',
    },
    header: {
      paddingTop: 20 + Constants.statusBarHeight,
      padding: 20,
      backgroundColor: '#336699',
    },
    description: {
      fontSize: 14,
      color: 'white',
    },
    input: {
      margin: 20,
      marginBottom: 0,
      height: 34,
      paddingHorizontal: 10,
      borderRadius: 4,
      borderColor: '#ccc',
      borderWidth: 1,
      fontSize: 16,
    },
  });