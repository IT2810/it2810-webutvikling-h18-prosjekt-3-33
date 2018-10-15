import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Button} from 'react-native';
import DatePicker from 'react-native-datepicker'
import * as Storage from '../../components/Storage';


export default class AddCalendarItem extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            date:"",
            startTime:'10:00',
            endTime: '12:00',

        }
      }
  static navigationOptions = {
    title: 'Add item',
  };


  componentDidMount(){ //When components mounts, setState date equal to todays actual date using javascript date Object
      const date = new Date()
      d = date.toISOString().split('T'); //Splitting object at T to an array 
      this.setState({date: d[0]}) //Index 0 of array is todays date

  }

  render() {
  return(
      <View style={styles.container}>
      <Text>Select day</Text>
      <DatePicker
        tyle={{width: 200}}
        date={this.state.date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="2017-01-01"
        maxDate="2019-12-30"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        showIcon={false}
        onDateChange={(date) => {this.setState({date: date})}}
        customStyles={{
            // ... You can check the source to find the other keys.
          }}
      />
      <Text>Select start time</Text>
      <DatePicker
          style={{width: 200}}
          date={this.state.startTime}
          mode="time"
          format="HH:mm"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          minuteInterval={10}
          Is24Hour={true}
          showIcon={false}
          onDateChange={(time) => {
              this.setState({starTime: time});
            }}
        />
        <Text>Select end time</Text>
        <DatePicker
          style={{width: 200}}
          date={this.state.endTime}
          mode="time"
          format="HH:mm"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          minuteInterval={10}
          Is24Hour={true}
          showIcon={false}
          onDateChange={(time) => {
            if(time < this.state.startTime){

                alert("End time must be later than start")
                
            }else{
                this.setState({endTime: time});
            }
            }}
        />
            {/*Button has an onPress function that sends us back to CalendarScreen with correct date item
            such that it can be displayed in our <Agenda /> */}
        <Button title="Add" onPress={()=>{
            alert("Added")
            const date = this.state.date
            const startTime = this.state.startTime
            const endTime = this.state.endTime
            const data = {
                date: date,
                startTime: startTime,
                endTime: endTime
            }
            this.props.navigation.state.params.onAddItem(data)

        }}></Button>

        </View>
    )

  }
}


const styles = StyleSheet.create({
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
      }
  }); 