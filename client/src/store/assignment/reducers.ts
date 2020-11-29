import { on } from 'ts-action-immer';
import { reducer } from 'ts-action';
import {
  setAssignment,
  setAssignmentGroups,
  setAssignmentRequestState,
  setAssignments,
  setAuthorAssignments,
  setSubmissionCountPerHour,
} from './actions';
import { Assignment } from '../../code/interfaces/assignment';
import { AssignmentGroup } from '../../code/interfaces/assignmentGroup';
import { AssignmentArray } from '../../code/interfaces/assignmentArray';
import { SubmissionCountPerHour } from '../../code/interfaces/submissionCountPerHour';
import { LoadingState } from '../../code/enums/loading';

export interface State {
  assignments: Assignment[];
  assignmentGroups: AssignmentGroup[];
  authorAssignments: AssignmentArray | undefined;
  submissionCountPerHour: SubmissionCountPerHour[];
  assignment: Assignment | undefined;
  assignmentRequestState: LoadingState;
}

export const initialState: State = {
  assignments: [],
  assignmentGroups: [],
  authorAssignments: undefined,
  submissionCountPerHour: [],
  assignment: undefined,
  assignmentRequestState: LoadingState.Initial,
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
  on(setSubmissionCountPerHour, (state: State, { payload }) => {
    state.submissionCountPerHour = payload.submissionCountPerHour;
  }),
  on(setAssignment, (state: State, { payload }) => {
    state.assignment = payload.assignment;
  }),
  on(setAssignmentRequestState, (state: State, { payload }) => {
    state.assignmentRequestState = payload.assignmentRequestState;
  }),
);
