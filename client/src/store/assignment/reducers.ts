import { on } from 'ts-action-immer';
import { reducer } from 'ts-action';
import {
  setAssignmentGroups,
  setAssignments,
  setAuthorAssignments,
  setLoadingState,
  setSubmissionCountPerHour,
} from './actions';
import { Assignment } from '../../code/interfaces/assignment';
import { AssignmentGroup } from '../../code/interfaces/assignmentGroup';
import { AssignmentArray } from '../../code/interfaces/assignmentArray';
import { SubmissionPerHourCountDto } from '../../../../server/src/modules/assignment/dtos/submissionPerHourCountDto';
import { LoadingState } from '../../code/loading';

export interface State {
  assignments: Assignment[];
  assignmentGroups: AssignmentGroup[];
  authorAssignments: AssignmentArray | undefined;
  submissionCountPerHour: SubmissionPerHourCountDto[];
  loadingState: LoadingState;
}

export const initialState: State = {
  assignments: [],
  assignmentGroups: [],
  authorAssignments: undefined,
  submissionCountPerHour: [],
  loadingState: LoadingState.Initial,
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
  on(setLoadingState, (state: State, { payload }) => {
    state.loadingState = payload.loadingState;
  }),
);
