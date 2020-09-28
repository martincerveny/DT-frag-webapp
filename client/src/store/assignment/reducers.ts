import { on } from 'ts-action-immer';
import { reducer } from 'ts-action';
import { setAssignmentGroups, setAssignments, setAuthorAssignments } from './actions';
import { Assignment } from '../../code/interfaces/assignment';
import { AssignmentGroup } from '../../code/interfaces/assignmentGroup';
import { AssignmentArray } from '../../code/interfaces/assignmentArray';

export interface State {
  assignments: Assignment[];
  assignmentGroups: AssignmentGroup[];
  authorAssignments: AssignmentArray | undefined;
}

export const initialState: State = {
  assignments: [],
  assignmentGroups: [],
  authorAssignments: undefined,
};

export const assignmentReducer = reducer<State>(
  initialState,
  on(setAssignments, (state: State, { payload }) => {
    state.assignments = payload.assignments;
  }),
  on(setAssignmentGroups, (state: State, { payload }) => {
    state.assignmentGroups = payload.assignmentGroups;
  }),
  on(setAuthorAssignments, (state: State, { payload }) => {
    state.authorAssignments = payload.authorAssignments;
  }),
);
