import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import EditPushupsGoal from '../SubGoalScreens/EditPushupsGoal';
import * as Storage from '../../components/Storage';

describe("EditGoalScreen ", () => {

  it('renders the EditPushupsGoal', async () => {
    const navigation = {
      getParam: () => 5,
      state: {
        params: {
          onLoad: jest.fn()
        }
      }
    }
    const tree = renderer.create(<EditPushupsGoal navigation={navigation} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  it('sets new data', () => {
    const navigation = {
      getParam: () => 5,
      state: {
        params: {
          onLoad: jest.fn()
        }
      }
    }
    const tree = renderer.create(<EditPushupsGoal navigation={navigation} />).getInstance();
    let newGoal = 10
    tree.changePushupsGoal(newGoal);
    expect(tree.state.pushupsGoal).toEqual(newGoal);
  })



});
