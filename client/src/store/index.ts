import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import { reducer, State } from './combinedReducers';

const store = createStore<State, any, any, any>(reducer, applyMiddleware(thunk, logger));

export default store;
