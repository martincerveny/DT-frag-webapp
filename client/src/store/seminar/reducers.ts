import { on } from 'ts-action-immer';
import { reducer } from 'ts-action';
import {
  setActivity,
  setAllEnrollments,
  setAttendance,
  setLoadingState,
  setSeminarEnrollments,
  setSeminars,
} from './actions';
import { Seminar } from '../../code/interfaces/seminar';
import { Enrollment } from '../../code/interfaces/enrollment';
import { Attendance } from '../../code/interfaces/attendance';
import { Activity } from '../../code/interfaces/activity';
import { LoadingState } from '../../code/loading';

export interface State {
  loadingState: LoadingState;
  seminars: Seminar[];
  seminarEnrollments: Enrollment[];
  allEnrollments: Enrollment[];
  attendance: Attendance[];
  activity: Activity[];
}

export const initialState: State = {
  loadingState: LoadingState.Initial,
  seminars: [],
  seminarEnrollments: [],
  allEnrollments: [],
  attendance: [],
  activity: [],
};

export const seminarReducer = reducer<State>(
  initialState,
  on(setSeminars, (state: State, { payload }) => {
    state.seminars = payload.seminars;
  }),
  on(setSeminarEnrollments, (state: State, { payload }) => {
    state.seminarEnrollments = payload.seminarEnrollments;
  }),
  on(setAllEnrollments, (state: State, { payload }) => {
    state.allEnrollments = payload.allEnrollments;
  }),
  on(setAttendance, (state: State, { payload }) => {
    state.attendance = payload.attendance;
  }),
  on(setActivity, (state: State, { payload }) => {
    state.activity = payload.activity;
  }),
  on(setLoadingState, (state: State, { payload }) => {
    state.loadingState = payload.loadingState;
  }),
);
