import { on } from 'ts-action-immer';
import { reducer } from 'ts-action';
import { setActivity, setAttendance, setEnrollments, setLoadingState, setSeminars } from './actions';
import { Seminar } from '../../code/interfaces/seminar';
import { Enrollment } from '../../code/interfaces/enrollment';
import { Attendance } from '../../code/interfaces/attendance';
import { Activity } from '../../code/interfaces/activity';
import { LoadingState } from '../../code/loading';

export interface State {
  loadingState: LoadingState;
  seminars: Seminar[];
  enrollments: Enrollment[];
  attendance: Attendance[];
  activity: Activity[];
}

export const initialState: State = {
  loadingState: LoadingState.Initial,
  seminars: [],
  enrollments: [],
  attendance: [],
  activity: [],
};

export const seminarReducer = reducer<State>(
  initialState,
  on(setSeminars, (state: State, { payload }) => {
    state.seminars = payload.seminars;
  }),
  on(setEnrollments, (state: State, { payload }) => {
    state.enrollments = payload.enrollments;
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
