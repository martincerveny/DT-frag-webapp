import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { reducer, State } from './combinedReducers';

let middleware: any[] = [thunk];

if (process.env.REACT_APP_DEBUG !== 'false') {
  const { logger } = require(`redux-logger`);
  middleware = [...middleware, logger];
}

const store = createStore<State, any, any, any>(reducer, applyMiddleware(...middleware));

export default store;
