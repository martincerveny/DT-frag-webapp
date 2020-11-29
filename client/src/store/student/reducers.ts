import { on } from 'ts-action-immer';
import { reducer } from 'ts-action';
import {
  setActivity,
  setNotepads,
  setStudent,
  setStudentActivityRequestState,
  setStudentAttendance,
  setStudentAttendanceRequestState,
  setStudentFiles,
  setStudentFilesRequestState,
  setStudentNotepadsRequestState,
  setStudentRequestState,
} from './actions';
import { StudentAttendance } from '../../code/interfaces/studentAttendance';
import { Activity } from '../../code/interfaces/activity';
import { Notepads } from '../../code/interfaces/notepads';
import { Person } from '../../code/interfaces/person';
import { StudentFile } from '../../code/interfaces/studentFile';
import { LoadingState } from '../../code/enums/loading';

export interface State {
  studentAttendance: StudentAttendance[];
  activity: Activity[];
  notepads: Notepads | undefined;
  student: Person | undefined;
  studentFiles: StudentFile[];
  studentRequestState: LoadingState;
  studentActivityRequestState: LoadingState;
  studentAttendanceRequestState: LoadingState;
  studentNotepadsRequestState: LoadingState;
  studentFilesRequestState: LoadingState;
}

export const initialState: State = {
  studentAttendance: [],
  activity: [],
  notepads: undefined,
  student: undefined,
  studentFiles: [],
  studentRequestState: LoadingState.Initial,
  studentActivityRequestState: LoadingState.Initial,
  studentAttendanceRequestState: LoadingState.Initial,
  studentNotepadsRequestState: LoadingState.Initial,
  studentFilesRequestState: LoadingState.Initial,
};

export const studentReducer = reducer<State>(
  initialState,
  on(setStudentAttendance, (state: State, { payload }) => {
    state.studentAttendance = payload.studentAttendance;
  }),
  on(setActivity, (state: State, { payload }) => {
    state.activity = payload.activity;
  }),
  on(setNotepads, (state: State, { payload }) => {
    state.notepads = payload.notepads;
  }),
  on(setStudent, (state: State, { payload }) => {
    state.student = payload.student;
  }),
  on(setStudentFiles, (state: State, { payload }) => {
    state.studentFiles = payload.studentFiles;
  }),
  on(setStudentRequestState, (state: State, { payload }) => {
    state.studentRequestState = payload.studentRequestState;
  }),
  on(setStudentActivityRequestState, (state: State, { payload }) => {
    state.studentActivityRequestState = payload.studentActivityRequestState;
  }),
  on(setStudentAttendanceRequestState, (state: State, { payload }) => {
    state.studentAttendanceRequestState = payload.studentAttendanceRequestState;
  }),
  on(setStudentNotepadsRequestState, (state: State, { payload }) => {
    state.studentNotepadsRequestState = payload.studentNotepadsRequestState;
  }),
  on(setStudentFilesRequestState, (state: State, { payload }) => {
    state.studentFilesRequestState = payload.studentFilesRequestState;
  }),
);
