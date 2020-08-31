import { on } from 'ts-action-immer';
import { reducer } from 'ts-action';
import { setAssignments } from './actions';
import {Assignment} from "../../code/interfaces/assignment";

export interface State {
  assignments: Assignment[];
}

export const initialState: State = {
  assignments: [],
};

export const assignmentReducer = reducer<State>(
  initialState,
  on(setAssignments, (state: State, { payload }) => {
    state.assignments = payload.assignments;
  }),
);
