import { on } from 'ts-action-immer';
import { reducer } from 'ts-action';
import {
  setActivityPts,
  setAllEnrollments,
  setAttendance,
  setAttendanceDeadline,
  setLoadingState,
  setSeminarEnrollments,
  setSeminars,
} from './actions';
import { Seminar } from '../../code/interfaces/seminar';
import { Enrollment } from '../../code/interfaces/enrollment';
import { Attendance } from '../../code/interfaces/attendance';
import { ActivityPts } from '../../code/interfaces/activityPts';
import { LoadingState } from '../../code/enums/loading';
import { AttendanceDeadline } from '../../code/interfaces/attendanceDeadline';

export interface State {
  loadingState: LoadingState;
  seminars: Seminar[];
  seminarEnrollments: Enrollment[];
  allEnrollments: Enrollment[];
  attendance: Attendance[];
  attendanceDeadline: AttendanceDeadline | undefined;
  activityPts: ActivityPts[];
}

export const initialState: State = {
  loadingState: LoadingState.Initial,
  seminars: [],
  seminarEnrollments: [],
  allEnrollments: [],
  attendance: [],
  attendanceDeadline: undefined,
  activityPts: [],
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
  on(setAttendanceDeadline, (state: State, { payload }) => {
    state.attendanceDeadline = payload.attendanceDeadline;
  }),
  on(setActivityPts, (state: State, { payload }) => {
    state.activityPts = payload.activityPts;
  }),
  on(setLoadingState, (state: State, { payload }) => {
    state.loadingState = payload.loadingState;
  }),
);
