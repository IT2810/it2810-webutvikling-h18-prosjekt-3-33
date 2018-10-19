import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import GoalsScreen from '../GoalsScreen';
import * as Storage from '../../components/Storage';
import StepGoal from '../../components/StepGoal.js';
import StudyGoal from '../../components/StudyGoal.js';
import PushupsGoal from '../../components/PushupsGoal.js';
import EditGoalScreen from '../SubGoalScreens/EditGoalScreen.js';
import ShallowRenderer from 'react-test-renderer/shallow';
import {shallow} from 'enzyme';
import ToggleSwitch from '../SubGoalScreens/ToggleSwitch.js';

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

  it('calling the onChooseLoad-function in GoalScreen', () => {
      let GoalsScreenComponent = renderer.create(<GoalsScreen />).getInstance();
      GoalsScreenComponent.onChooseLoad({goalChooser: {
  			stepGoal: true,
  			studyGoal: false,
  			pushupsGoal: false
  		}});

      let item = {
  			stepGoal: true,
  			studyGoal: false,
  			pushupsGoal: false
  		}
      expect(GoalsScreenComponent.state.goalChooser).toEqual(item);

  });

  it('calling the onLoad-function in GoalScreen', () => {
      let GoalsScreenComponent = renderer.create(<GoalsScreen />).getInstance();
      GoalsScreenComponent.onLoad({stepGoal: 7000, studyGoal: 6, pushupsGoal: 10});

      let stepGoalItem = 7000;
      let studyGoalItem = 6;
      let pushupsGoalItem = 10;
      expect(GoalsScreenComponent.state.stepGoal).toEqual(stepGoalItem);
      expect(GoalsScreenComponent.state.studyGoal).toEqual(studyGoalItem);
      expect(GoalsScreenComponent.state.pushupsGoal).toEqual(pushupsGoalItem);

  });
});
