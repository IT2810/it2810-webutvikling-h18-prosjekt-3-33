import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

// Icons for the navbar
import TabBarIcon from '../components/TabBarIcon';

// Main components
import GoalsScreen from '../screens/GoalsScreen';
import CalendarScreen from '../screens/CalendarScreen';
import ContactsScreen from '../screens/ContactsScreen'
import EditGoalScreen from '../screens/SubGoalScreens/EditGoalScreen';
import EditStepGoal from '../screens/SubGoalScreens/EditStepGoal';
import EditStudyGoal from '../screens/SubGoalScreens/EditStudyGoal';
import EditPushupsGoal from '../screens/SubGoalScreens/EditPushupsGoal';
import AddCalendarItem from '../screens/SubCalendarScreens/AddCalendarItemScreen';

const GoalsStack = createStackNavigator({
  Goals: GoalsScreen,
  EditGoals: EditGoalScreen,
  EditStep: EditStepGoal,
  EditStudy: EditStudyGoal,
  EditPushups: EditPushupsGoal
});

GoalsStack.navigationOptions = {
  tabBarLabel: 'Goals',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-pie${focused ? '' : '-outline'}`
          : 'md-pie'
      }
    />
  ),
};


const CalendarStack = createStackNavigator({
  Calendar: CalendarScreen,
  addItem: AddCalendarItem,
});

CalendarStack.navigationOptions = {
  tabBarLabel: 'Calendar',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-calendar${focused ? '' : '-outline'}` : 'md-calendar'}
    />
  ),
};

const ContactsStack = createStackNavigator({
  Contacts: ContactsScreen,
});

ContactsStack.navigationOptions = {
  tabBarLabel: 'Contacts',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-contact${focused ? '' : '-outline'}` : 'md-contact'}
    />
  ),
};

export default createBottomTabNavigator({
  GoalsStack,
  CalendarStack,
  ContactsStack,
});
