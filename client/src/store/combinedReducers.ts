import { combineReducers } from 'redux';
import * as general from './general/reducers';

export interface State {
  general: general.State;
}

export const initialState: State = {
  general: general.initialState,
};

export const reducer = combineReducers<State>({
  general: general.generalReducer,
});
