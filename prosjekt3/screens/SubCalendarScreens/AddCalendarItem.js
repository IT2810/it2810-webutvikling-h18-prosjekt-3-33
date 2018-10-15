import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Button} from 'react-native';
import DatePicker from 'react-native-datepicker'
import * as Storage from '../../components/Storage';


export default class AddCalendarItem extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            date:"2018-10-8",
            startTime:'10:00',
            endTime: '12:00',

        }
      }
  static navigationOptions = {
    title: 'Add item',
  };


  ComponentDidUpdate(){

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
      <Text>Start time</Text>
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
        <Text>End time</Text>
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

        <Button title="Add" onPress={()=>{
            alert("Added")
            this.props.navigation.navigate('Calendar')
            
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