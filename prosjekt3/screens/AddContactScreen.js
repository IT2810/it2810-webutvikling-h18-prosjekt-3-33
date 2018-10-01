import React from 'react';
import { Alert, TextInput,StyleSheet, View} from 'react-native';
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
                onChangeText={name => this.setState({name})}
                ref={ref => {this._nameInput = ref}}
                placeholder="Full Name"
                autoFocus={true}
                autoCapitalize="words"
                autoCorrect={true}
                keyboardType="default"
                returnKeyType="next"
                onSubmitEditing={this._next}
                blurOnSubmit={false}
            />
            <TextInput
                style={styles.input}
                value={this.state.email}
                onChangeText={email => this.setState({email})}
                placeholder="email@example.com"
                />
            <TextInput
                style={styles.input}
                value={this.state.phone}
                onChangeText={phone => this.setState({phone})}
                keyboardType="default"
                placeholder="Phone number"
                onSubmitEditing={this._submit}
                
            />
          </View>
  
      );
    }
      
      _submit = () => {
        Alert.alert(`Welcome, ${this.state.name}! Confirmation email has been sent to ${this.state.email}
        and your phone number is ${this.state.phone}`);

      };
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