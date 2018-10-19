import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import MobileButton from 'react-native';
import StudyGoal from '../StudyGoal';
import StudyCounter from '../StudyCounter';
import { Pedometer } from 'expo';


describe('StudyGoal', () => {

	it('renders correctly', () => {
	  	const studygoal = renderer.create(<StudyGoal />).toJSON();
	  	expect(studygoal).toMatchSnapshot();
	});

});

describe('StudyCounter', () => {
  it('renders correctly', () => {
    const studycounter = renderer.create(<StudyCounter />).toJSON();
    expect(studycounter).toMatchSnapshot();
  });

  it('increments counter correctly', () => {
    const studycounter = renderer.create(<StudyCounter />).getInstance();
    const prevCounter = studycounter.state.currentStudyCount;
    studycounter.incrementCounter(5);
   	const newCounter = studycounter.state.currentStudyCount;
    expect(newCounter).toEqual(prevCounter+1);
  });

	it('decrements counter correctly', () => {
    const studycounter = renderer.create(<StudyCounter />).getInstance();
    const prevCounter = studycounter.state.currentStudyCount;
    studycounter.decrementCounter(5);
   	const newCounter = studycounter.state.currentStudyCount;
    expect(newCounter).toEqual(prevCounter-1);
  });

	it('fetches from props', () => {
		const studyGoal= 5;
		const studycounter = renderer.create(<StudyCounter studyGoal={studyGoal} />).getInstance();
		const prevGoal = studycounter.state.studyGoal;
		expect(prevGoal).toEqual(studyGoal);
	});

	it('calculates progress colors', () => {
		let goal= 8;
		let progress = 8;
		const studycounter = renderer.create(<StudyCounter />).getInstance();
		const result = studycounter.progressBarStyle(progress,goal);
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
		const secondResult = studycounter.progressBarStyle(progress,goal);
		expect(secondResult).toEqual(expectedResult);

		goal = 10;
		progress = 0;
		expectedResult = {
			flex: 0,
    	backgroundColor: '#DB0200',
		}
		const thirdResult = studycounter.progressBarStyle(progress,goal);
		expect(thirdResult).toEqual(expectedResult);
	});

});
