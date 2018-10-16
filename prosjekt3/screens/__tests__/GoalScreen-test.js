import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import GoalsScreen from '../GoalsScreen';
import * as Storage from '../../components/Storage';
import StepGoal from '../../components/StepGoal.js';
import StudyGoal from '../../components/StudyGoal.js';
import PushupsGoal from '../../components/PushupsGoal.js';

describe("GoalsScreen Testing", () => {

  it('renders the GoalScreen', async () => {
      const tree = renderer.create(<GoalsScreen />).toJSON();
      expect(tree).toMatchSnapshot();
  });

  it('renders the StepGoal component', async () => {
      const tree = renderer.create(<StepGoal />).toJSON();
      expect(tree).toMatchSnapshot();
  });

  it('renders the StudyGoal component', async () => {
      const tree = renderer.create(<StudyGoal />).toJSON();
      expect(tree).toMatchSnapshot();
  });

  it('renders the PushupsGoal component', async () => {
      const tree = renderer.create(<PushupsGoal />).toJSON();
      expect(tree).toMatchSnapshot();
  });
})
