import React from 'react';
import { shallow } from 'enzyme';
import MainPage from './MainPage';

let wrapper;
beforeEach(() => {
    const mockProps = {
        onRequestRobots: jest.fn(),
        robots: [],
        searchField: '',
        isPending: false
    }
    wrapper = shallow(<MainPage {...mockProps} />);
});

it('renders MainPage without crashing', () => {
    expect(wrapper).toMatchSnapshot();
});

it('filters robots correctly', () => {
    const mockProps2 = {
        onRequestRobots: jest.fn(),
        robots: [{
            id: 3,
            name: 'John',
            email: 'john@gmail.com'
        }],
        searchField: 'john',
        isPending: false
    }
    const wrapper2 = shallow(<MainPage {...mockProps2} />);
    expect(wrapper2.instance().filterRobots(mockProps2.robots)).toEqual([{
        id: 3,
        name: 'John',
        email: 'john@gmail.com'
    }]);
})

it('filters robots correctly 2', () => {
    const mockProps3 = {
        onRequestRobots: jest.fn(),
        robots: [{
            id: 3,
            name: 'John',
            email: 'john@gmail.com'
        }],
        searchField: 'a',
        isPending: false
    }
    const filteredRobots = [];
    const wrapper3 = shallow(<MainPage {...mockProps3} />);
    expect(wrapper3.instance().filterRobots(mockProps3.robots)).toEqual(filteredRobots);
})

it('testing pending', () => {
    const mockProps4 = {
        onRequestRobots: jest.fn(),
        robots: [{
            id: 3,
            name: 'John',
            email: 'john@gmail.com'
        }],
        searchField: 'a',
        isPending: true
    }
    const filteredRobots = [];
    const wrapper4 = shallow(<MainPage {...mockProps4} />);
    expect(wrapper4.instance().filterRobots(mockProps4.robots)).toEqual(filteredRobots);
})