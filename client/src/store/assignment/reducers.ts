import { on } from 'ts-action-immer';
import { reducer } from 'ts-action';
import { setAssignmentGroups, setAssignments } from './actions';
import { Assignment } from '../../code/interfaces/assignment';
import { AssignmentGroup } from '../../code/interfaces/assignmentGroup';

export interface State {
  assignments: Assignment[];
  assignmentGroups: AssignmentGroup[];
}

export const initialState: State = {
  assignments: [],
  assignmentGroups: [],
};

export const assignmentReducer = reducer<State>(
  initialState,
  on(setAssignments, (state: State, { payload }) => {
    state.assignments = payload.assignments;
  }),
  on(setAssignmentGroups, (state: State, { payload }) => {
    state.assignmentGroups = payload.assignmentGroups;
  }),
);
