import { combineReducers } from 'redux';
import * as general from './general/reducers';
import * as assignment from './assignment/reducers';

export interface State {
  general: general.State;
  assignment: assignment.State;
}

export const initialState: State = {
  general: general.initialState,
  assignment: assignment.initialState,
};

export const reducer = combineReducers<State>({
  general: general.generalReducer,
  assignment: assignment.assignmentReducer,
});
