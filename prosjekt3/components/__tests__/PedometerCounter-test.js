import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import MobileButton from 'react-native';
import PedometerCounter from '../PedometerCounter';
import { Pedometer } from 'expo';


describe('PedometerCounter', () => {

	it('renders correctly', () => {
	  	const pedometer = renderer.create(<PedometerCounter />).toJSON();
	  	expect(pedometer).toMatchSnapshot();
	});

	it('handles subscription correctly',  async () => {
		const pedometer = renderer.create(<PedometerCounter />).getInstance();
		await pedometer._subscribe()




	});
});