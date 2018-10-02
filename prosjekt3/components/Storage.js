import React from 'react';
import {
    AsyncStorage,
} from 'react-native';


/* Format of the storage:


{ CONTACTS:   [ { name: "Ulrik", age: 22, address: "Bakklandet"  },
                { name: "Sondre", age: 24, address: "Ila"        },
                { name: "Jørgen", age: 95, address: "Møhlenberg" }, 
                ....
              ],
  

  TASKS:      [ { title: "Meeting", date: "22-12-1995" },
                { title: "Dinner", date: "12-7-2995" },

                ...

              ]

  GOALS:      [ {title: "Stop smoking", duration: 5, start: "22-12-1995"}

              ] 
}





*/