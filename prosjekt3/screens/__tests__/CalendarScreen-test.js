import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import CalendarScreen from '../CalendarScreen';
import AddCalendarItemScreen from '../SubCalendarScreens/AddCalendarItemScreen';


describe('testing CalendarScreen', () =>{

    it('Renders correctly, simple snapshot',  () => {
        jest.mock('react-native-calendars', () => 'Agenda');
        const tree = renderer.create(<AddCalendarItemScreen />).toJSON;

        expect(tree).toMatchSnapshot();
    })
})



