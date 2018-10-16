import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import MobileButton from 'react-native';
import PedometerCounter from '../PedometerCounter';
import { Pedometer } from 'expo';


describe('PedometerCounter', () => {

	test('renders correctly', () => {
	  	const pedometer = renderer.create(<PedometerCounter />).toJSON();
	  	expect(pedometer).toMatchSnapshot();
	});

	test('handles subscription correctly', done => {
		expect.assertions(3);
		const pedometer = renderer.create(<PedometerCounter />).getInstance();
		expect(pedometer).toBeDefined();
		expect(pedometer.state.isPedometerActive).toEqual('checking');


		// doesn't work
		function callback() {
			// if error:
			    expect(pedometer.state.pastStepCount).not.toBe(0);
			    done();
		    // if success: 
		    	expect(pedometer.state.pastStepCount).toBeGreaterThanOrEqual(0)
		 }


		pedometer._subscribe(callback);
		console.log(pedometer.state);

	});
});