import React from 'react';
import {
    View,
    Text,
    AsyncStorage,
} from 'react-native';


// class for getting and setting data in the AsyncStorage
export default class Storage extends React.Component {

    /* ex.:
      key = 'user'
      obj =  
      {
            name: 'Jørgen Stai',
            email: 'test@gmail.com',
            city: 'Stockholm',
        }
    */
    saveData(key, obj) {
        let obj = JSON.stringify(obj);
        AsyncStorage.setItem(key, JSON.stringify(obj));
    }


    /* ex.:

      key   = 'user'
      item  = 'name'

    */
    displayData = async (key, item) => {
      try {
        let obj = await AsyncStorage.getItem(key);
        let parsed = JSON.parse(obj);
        alert(parsed.item); // parsed.item returerer det man fetcher etter, f.eks. 'name' under nøkkelen 'user'
      }

      catch(error) {
        alert(error);
      }
    }
}
  