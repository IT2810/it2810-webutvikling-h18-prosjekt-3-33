import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import CalendarScreen from '../CalendarScreen';
import AddCalendarItemScreen from '../SubCalendarScreens/AddCalendarItemScreen';
import {Agenda} from 'react-native-calendars'
import {DatePicker} from 'react-native-datepicker';


jest.mock('react-native-datepicker');
jest.mock('react-native-calendars');

describe('testing CalendarScreen', () =>{

    it('Renders AddCalenderItemScreen correctly', () => {
        const tree = renderer.create(<AddCalendarItemScreen />).toJSON();
        expect(tree).toMatchSnapshot();

    })

    it('Handle TextInput events in AddCalenderItemScreen', () => {
        const addCalendarItemScreen = renderer.create(<AddCalendarItemScreen />).getInstance();

        let testState = {
            date: '2018-10-05',
            startTime:'20:00',
            endTime: '23:00',
            text: 'Test text',

        }
        addCalendarItemScreen.handleDateChange(testState.date)
        addCalendarItemScreen.handleTextChange(testState.text)
        addCalendarItemScreen.handleStartTimeChange(testState.startTime)
        addCalendarItemScreen.handleEndTimeChange(testState.endTime)

        expect(addCalendarItemScreen.state).toEqual(testState)


    })

    it('Renders CalendarScreen correctly', () => {
        const navigation = {
            setParams: jest.fn(),
        }
        const tree = renderer.create(<CalendarScreen navigation={navigation}/>).toJSON();
        expect(tree).toMatchSnapshot();

    })

    it('onAddItem updates state correctly, CalendarScreen', () => {
        const navigation = {
            setParams: jest.fn(),
        }
        const Calendar = renderer.create(<CalendarScreen navigation={navigation}/>).getInstance();

        let testItem = {
            date: '2018-10-05',
            startTime:'20:00',
            endTime: '23:00',
            text: 'Test text',
        }

        let testState = {
            '2018-10-05': [
                {
                    name: '20:00-23:00',
                    text: 'Test text'
                }
            ]
        }
        Calendar.onAddItem(testItem)

        expect(Calendar.state.items).toEqual(testState)

    })

    it('onMountAddTasks updates state correctly, CalendarScreen', () => {
        const navigation = {
            setParams: jest.fn(),
        }
        const Calendar = renderer.create(<CalendarScreen navigation={navigation}/>).getInstance();

        let testItem = [{
            'key': '2018-10-05',
            'info': {
                    name: '20:00-23:00',
                    text: 'Test text'
                }
            }]

        let testState = {
            '2018-10-05': 
                {
                    name: '20:00-23:00',
                    text: 'Test text'
                }
        }

        Calendar.onMountAddTasks(testItem)
        expect(Calendar.state.items).toEqual(testState)

    })

    it('Calling onAddItem and checks if Snapshot matches, CalendarScreen', () => {
        const navigation = {
            setParams: jest.fn(),
        }
        const Calendar = renderer.create(<CalendarScreen navigation={navigation}/>)

        let testItem = {
            date: '2018-10-05',
            startTime:'20:00',
            endTime: '23:00',
            text: 'Test text',
        }

        Calendar.getInstance().onAddItem(testItem)
        expect(Calendar.toJSON()).toMatchSnapshot();

    })

})



