import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import PushupsCounter from '../PushupsCounter';


describe('PushupsCounter', () => {

	it('renders correctly', () => {
	  	const pushupCounter = renderer.create(<PushupsCounter />).toJSON();
	  	expect(pushupCounter).toMatchSnapshot();
	});
});