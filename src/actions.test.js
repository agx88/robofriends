import * as actions from './actions';
import {
    CHANGE_SEARCHFIELD,
    REQUEST_ROBOTS_PENDING,
    REQUEST_ROBOTS_SUCCESS,
    REQUEST_ROBOTS_FAILED,
} from './constants';

//to test dispatch with thunk
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';

const mockStore = configureMockStore([thunkMiddleware]);

it('should create an action to search robots', () => {
    const text = 'wooo';
    const expectedAction = {
        type: CHANGE_SEARCHFIELD,
        payload: text
    }
    expect(actions.setSearchField(text)).toEqual(expectedAction);
})

it('handles requesting robots API', () => {
    const url = 'https://jsonplaceholder.typicode.com/users';
    const store = mockStore();
    store.dispatch(actions.requestRobots(url));
    const action = store.getActions();
    const expectedAction = {
        type: REQUEST_ROBOTS_PENDING
    }
    expect(action[0]).toEqual(expectedAction)
})

it('handles request success', async () => {
    const url = 'https://jsonplaceholder.typicode.com/users';
    const store = mockStore();
    const result = await store.dispatch(actions.requestRobots(url));
    expect(result.type).toEqual(REQUEST_ROBOTS_SUCCESS);
})

it('handles request failure', async () => {
    const url = 'https://mock.org';
    const store = mockStore();
    const result = await store.dispatch(actions.requestRobots(url));
    expect(result.type).toEqual(REQUEST_ROBOTS_FAILED);
})