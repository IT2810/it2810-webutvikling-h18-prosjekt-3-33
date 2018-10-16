import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Button, TextInput} from 'react-native';
import DatePicker from 'react-native-datepicker'
import * as Storage from '../../components/Storage';


export default class AddCalendarItem extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            date:"",
            startTime:'10:00',
            endTime: '12:00',
            text: '',

        }
      }
  static navigationOptions = {
    title: 'Create task ',
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
        style={{width: 200}}
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
              this.setState({startTime: time});
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
                this.setState({endTime: time});
            }}
        />

        <TextInput
        style={styles.input}
        value={this.state.text}
        multiline={true}
        maxLength={140}
        onChangeText={text => this.setState({text})}
        keyboardType="default"
        placeholder="information about your schedule"
        />
            {/*Button has an onPress function that sends us back to CalendarScreen with correct date item
            such that it can be displayed in our <Agenda /> */}
        <Button title="Add Task" onPress={()=>{
            alert("Added")
            const date = this.state.date
            const startTime = this.state.startTime
            const endTime = this.state.endTime
            const text = this.state.text
            const data = {
                date: date,
                startTime: startTime,
                endTime: endTime,
                text: text
            }
            this.props.navigation.state.params.onAddItem(data)
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
      },
      input: {
        margin: 20,
        marginBottom: 0,
        height: 34,
        width: '80%',
        height: 200,
        paddingHorizontal: 10,
        borderRadius: 4,
        borderColor: '#ccc',
        borderWidth: 1,
        fontSize: 16,

      },
  }); 