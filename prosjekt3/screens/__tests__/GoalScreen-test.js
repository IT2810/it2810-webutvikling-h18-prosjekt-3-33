import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import GoalsScreen from '../GoalsScreen';
import * as Storage from '../../components/Storage';
import StepGoal from '../../components/StepGoal.js';
import StudyGoal from '../../components/StudyGoal.js';
import PushupsGoal from '../../components/PushupsGoal.js';
import EditGoalScreen from '../SubGoalScreens/EditGoalScreen.js';
import EditStepGoal from '../SubGoalScreens/EditStepGoal';
import EditStudyGoal from '../SubGoalScreens/EditStudyGoal';
import ToggleSwitch from '../SubGoalScreens/ToggleSwitch.js';
import Slider from 'react-native-slider';
import EditPushupsGoal from '../SubGoalScreens/EditPushupsGoal';
import '../SubGoalScreens/ToggleSwitch';


jest.mock('../SubGoalScreens/ToggleSwitch', () => 'ToggleSwitch')
jest.mock('react-native-slider')

const navigation = {
    getParam: () => true,
    state: {
        params: {
            onLoad: jest.fn()
        }
    }
}

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

  it('Snapshot test for EditGoalScreen', () => {
    let GoalsScreenComponent = renderer.create(<EditGoalScreen  navigation={navigation} />).toJSON();
    expect(GoalsScreenComponent).toMatchSnapshot();
});

    it('ToggleMethods state test for EditGoalScreen', () => {

        const GoalsScreenComponent = renderer.create(<EditGoalScreen navigation={navigation} />).getInstance();

        GoalsScreenComponent.togglePushups()
        expect(GoalsScreenComponent.state).toEqual({
            goalChooser: {
                pushupsGoal: true,
            }
        })

        GoalsScreenComponent.toggleStudy()
        expect(GoalsScreenComponent.state).toEqual({
            goalChooser: {
                studyGoal: true,
            }
        })

        GoalsScreenComponent.toggleSteps()
        expect(GoalsScreenComponent.state).toEqual({
            goalChooser: {
                stepGoal: true,
            }
        })

        


    });

    
    it('Snapshot test for EditStepGoal', () => {

      let GoalsScreenComponent = renderer.create(<EditStepGoal navigation={navigation} />).toJSON();
      expect(GoalsScreenComponent).toMatchSnapshot();

    })

    it('changeStepGoal method test for EditStepGoal', () => {

      let GoalsScreenComponent = renderer.create(<EditStepGoal navigation={navigation} />).getInstance();
      GoalsScreenComponent.changeStepGoal(5)
      expect(GoalsScreenComponent.state.stepGoal).toEqual(5)

    })

    it('Snapshot test for EditStudyGoal', () => {

      let GoalsScreenComponent = renderer.create(<EditStudyGoal navigation={navigation} />).toJSON();
      expect(GoalsScreenComponent).toMatchSnapshot();

    })

    it('changeStepGoal method test for EditStudyGoal', () => {

      let GoalsScreenComponent = renderer.create(<EditStudyGoal navigation={navigation} />).getInstance();
      GoalsScreenComponent.changeStudyGoal(5)
      expect(GoalsScreenComponent.state.studyGoal).toEqual(5)

    })




});
