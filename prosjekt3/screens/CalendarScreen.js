import React from 'react';
import {
	View,
  	Text,
  	Button,
  	AsyncStorage,
} from 'react-native';


export default class CalendarScreen extends React.Component {
	constructor(props){
        super(props);
        this.state = {
        }
      }

	static navigationOptions = {
	    title: 'Calendar',
	};

	/* TODO:

	- componentDidMount() init some dummy data
	- make the whole Storage into a component or separate file with atomic functions such as ' getGoals () '

	

	*/

  	render() {
  		let key = "CONTACTS";
  		let obj = 
  		[ 
  				{ name: "Ulrik", age: 22, address: "Bakklandet"  },
                { name: "Sondre", age: 24, address: "Ila"        },
                { name: "Jørgen", age: 95, address: "Møhlenberg" },
        ]
		return (
	    	<View>
	    		<Button
				    onPress={() => this._storeData(key, obj)}
				    title="Set item"
				    color="purple"
				/>
				<Button
				    onPress={() => this._retrieveData('CONTACTS')}
				    title="Get item"
				    color="blue"
				/>
				<Button
				    onPress={() => this.clearStorage()}
				    title="Clear storage"
				    color="red"
				/>
	    	</View>
	    )
  	}

  	_storeData = async (key, data) => {
	  try {
	  	alert(JSON.stringify(data)); // REMOVE
	    await AsyncStorage.setItem(key, JSON.stringify(data));
	  } catch (error) {
	    // Error saving data
	  }
	}
  	
  	// valid keys are TASKS, GOALS and CONTACTS
  	_retrieveData = async (key) => {
	  try {
	    const value = await AsyncStorage.getItem(key);
	    if (value !== null) {
	      	alert(value); // REMOVE
	    }
	   } catch (error) {
	     // Error retrieving data
	   }
	}



  	clearStorage = async () => {
	    AsyncStorage.clear();
	    alert("Storage cleared");
	}
}



