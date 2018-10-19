import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import MobileButton from 'react-native';
import PushupsGoal from '../PushupsGoal';
import PushupsCounter from '../PushupsCounter';


describe('PushupsGoal', () => {

	it('renders correctly', () => {
	  	const pushupsgoal = renderer.create(<PushupsGoal />).toJSON();
	  	expect(pushupsgoal).toMatchSnapshot();
	});

});

describe('PushupsCounter', () => {
  it('renders correctly', () => {
    const pushupscounter = renderer.create(<PushupsCounter />).toJSON();
    expect(pushupscounter).toMatchSnapshot();
  });

  it('increments counter correctly', () => {
    const pushupscounter = renderer.create(<PushupsCounter />).getInstance();
    const prevCounter = pushupscounter.state.currentPushupsCount;
    pushupscounter.incrementCounter();
   	const newCounter = pushupscounter.state.currentPushupsCount;
    expect(newCounter).toEqual(prevCounter+1);
  });

	it('decrements counter correctly', () => {
    const pushupscounter = renderer.create(<PushupsCounter />).getInstance();
    const prevCounter = pushupscounter.state.currentPushupsCount;
    pushupscounter.decrementCounter(5);
   	const newCounter = pushupscounter.state.currentPushupsCount;
    expect(newCounter).toEqual(prevCounter-1);
  });

	it('fetches from props', () => {
		const pushupsGoal= 5;
		const pushupscounter = renderer.create(<PushupsCounter pushupsGoal={pushupsGoal} />).getInstance();
		const prevGoal = pushupscounter.state.pushupsGoal;
		expect(prevGoal).toEqual(pushupsGoal);
	});

	it('calculates progress colors', () => {
		let goal= 8;
		let progress = 8;
		const pushupscounter = renderer.create(<PushupsCounter />).getInstance();
		const result = pushupscounter.progressBarStyle(progress,goal);
		let expectedResult = {
			flex: 1,
    	backgroundColor: '#75CDA8',
		}
		expect(result).toEqual(expectedResult);

		goal= 8;
		progress = 4;
		expectedResult = {
			flex: 0.5,
    	backgroundColor: '#EDBF2C',
		}
		const secondResult = pushupscounter.progressBarStyle(progress,goal);
		expect(secondResult).toEqual(expectedResult);

		goal = 10;
		progress = 0;
		expectedResult = {
			flex: 0,
    	backgroundColor: '#DB0200',
		}
		const thirdResult = pushupscounter.progressBarStyle(progress,goal);
		expect(thirdResult).toEqual(expectedResult);
	});

});
