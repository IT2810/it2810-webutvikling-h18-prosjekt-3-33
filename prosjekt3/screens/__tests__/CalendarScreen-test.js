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
        const tree = renderer.create(<AddCalendarItemScreen />).getInstance();

    })

})



