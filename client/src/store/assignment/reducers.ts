import { on } from 'ts-action-immer';
import { reducer } from 'ts-action';
import { setAssignmentGroups, setAssignments, setAssignmentsPassed } from './actions';
import { Assignment } from '../../code/interfaces/assignment';
import { AssignmentGroup } from '../../code/interfaces/assignmentGroup';
import { AssignmentPassed } from '../../code/interfaces/assignmentPassed';

export interface State {
  assignments: Assignment[];
  assignmentGroups: AssignmentGroup[];
  assignmentsPassed: AssignmentPassed[];
}

export const initialState: State = {
  assignments: [],
  assignmentGroups: [],
  assignmentsPassed: [],
};

export const assignmentReducer = reducer<State>(
  initialState,
  on(setAssignments, (state: State, { payload }) => {
    state.assignments = payload.assignments;
  }),
  on(setAssignmentGroups, (state: State, { payload }) => {
    state.assignmentGroups = payload.assignmentGroups;
  }),
  on(setAssignmentsPassed, (state: State, { payload }) => {
    state.assignmentsPassed = payload.assignmentsPassed;
  }),
);
