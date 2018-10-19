import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import MobileButton from 'react-native';
import StepGoal from '../StepGoal';
import { Pedometer } from 'expo';


describe('StepGoal', () => {

	it('renders correctly', () => {
	  	const stepgoal = renderer.create(<StepGoal />).toJSON();
	  	expect(stepgoal).toMatchSnapshot();
	});

});
