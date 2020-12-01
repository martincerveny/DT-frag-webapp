import { on } from 'ts-action-immer';
import { reducer } from 'ts-action';
import {
  setAssignment,
  setAssignmentRequestState,
  setAssignments,
  setFailedAssignments,
  setFailedAssignmentsRequestState,
  setPassedAssignments,
  setPassedAssignmentsRequestState,
  setSubmissionCountPerHour,
} from './actions';
import { Assignment } from '../../code/interfaces/assignment';
import { SubmissionCountPerHour } from '../../code/interfaces/submissionCountPerHour';
import { LoadingState } from '../../code/enums/loading';
import { AuthorAssignment } from '../../code/interfaces/authorAssignment';

export interface State {
  assignments: Assignment[];
  passedAssignments: AuthorAssignment[];
  failedAssignments: AuthorAssignment[];
  submissionCountPerHour: SubmissionCountPerHour[];
  assignment: Assignment | undefined;
  assignmentRequestState: LoadingState;
  passedAssignmentRequestState: LoadingState;
  failedAssignmentRequestState: LoadingState;
}

export const initialState: State = {
  assignments: [],
  passedAssignments: [],
  failedAssignments: [],
  submissionCountPerHour: [],
  assignment: undefined,
  assignmentRequestState: LoadingState.Initial,
  passedAssignmentRequestState: LoadingState.Initial,
  failedAssignmentRequestState: LoadingState.Initial,
};

export const assignmentReducer = reducer<State>(
  initialState,
  on(setAssignments, (state: State, { payload }) => {
    state.assignments = payload.assignments;
  }),
  on(setPassedAssignments, (state: State, { payload }) => {
    state.passedAssignments = payload.passedAssignments;
  }),
  on(setFailedAssignments, (state: State, { payload }) => {
    state.failedAssignments = payload.failedAssignments;
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
  on(setPassedAssignmentsRequestState, (state: State, { payload }) => {
    state.passedAssignmentRequestState = payload.passedAssignmentRequestState;
  }),
  on(setFailedAssignmentsRequestState, (state: State, { payload }) => {
    state.failedAssignmentRequestState = payload.failedAssignmentRequestState;
  }),
);
