import React from 'react';
import {
    AsyncStorage,
} from 'react-native';


// stores a key with its corresponding value (an array)
_storeData = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    // Error saving data
    console.error(error)
  }
}
  
// returns an array with the key value objects
_retrieveData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      parsed = JSON.parse(value);
      return parsed;
    } else {
      return [];
    }
   } catch (error) {
     // Error retrieving data
     console.error(error)
   }
}

// wipes the whole AsyncStorage for this app at client device
_clearStorage = async () => {
    try {
        AsyncStorage.clear();
    } catch (error) {
        // Error clearing storage
        console.error(error)
    }
}

// getters and setters
getContacts = async () => {
    return await _retrieveData("CONTACTS");
}

getGoals = async () => {
    return await _retrieveData("GOALS");
}

getTasks = async () => {
    return await _retrieveData("TASKS"); 
}

// expects an array of json objects, see dummy data example below (i.e. contacts, tasks, goals)
storeContacts = (data) => {
    _storeData("CONTACTS", data);
}

storeTasks = (data) => {
    _storeData("TASKS", data);
}

storeGoals = (data) => {
    _storeData("GOALS", data);
}

export {getGoals, getContacts, getTasks, storeContacts, storeGoals, storeTasks, _clearStorage, _retrieveData, _storeData};


/*    Format of the storage:



{ "CONTACTS": [ { "name": "Ulrik", "email": 22, "phonenumber": "Bakklandet"  },
                { "name": "Sondre", "age": 24, "address": "Ila"        },
                { "name": "Jørgen", "age": 95, "address": "Møhlenberg" } 
              ],


  "TASKS":    [ { "date": "22-12-1995" , name: 10:00-12:00, text: jeg skal kjøpe pizza i dag},
                { "title": "Dinner", "date": "12-7-2995" }
              ],

  "GOALS":    [ { "title": "Stop smoking", "duration": 5, "start": "22-12-1995"}

              ]
}
*/

/*    Dummy data the initialize the storage locally:

let contacts = 
            [ { "name": "Ulrik", "age": 22, "address": "Bakklandet"  },
                { "name": "Sondre", "age": 24, "address": "Ila"        },
                { "name": "Jørgen", "age": 95, "address": "Møhlenberg" }
            ];

let tasks = [ { "title": "Meeting", "date": "22-12-1995" },
              { "title": "Dinner", "date": "12-7-2995" }
            ];

let goals = [ { "title": "Stop smoking", "duration": 5, "start": "22-12-1995"},
              { "title": "Walk 500.000 steps", "duration": 15, "start": "22-12-2005"}
            ];


*/