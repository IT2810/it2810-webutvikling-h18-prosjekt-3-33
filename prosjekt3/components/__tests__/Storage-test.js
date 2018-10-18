import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import * as Storage from '../Storage.js';



// passes test if get methods from Storage returns an array (empty or not)
describe('AsyncStorage retrieval', () => {

	it('gets contacts', async () => {
		expect.assertions(1);
		let contacts = await Storage.getContacts();
  		expect(Array.isArray(contacts)).toBe(true);
	});

	it('gets goals', async () => {
		expect.assertions(1);
		let goals = await Storage.getGoals();
  		expect(Array.isArray(goals)).toBe(true);
	});

	it('gets tasks', async () => {
		expect.assertions(1);
		let tasks = await Storage.getTasks();
  		expect(Array.isArray(tasks)).toBe(true);
	});


});




