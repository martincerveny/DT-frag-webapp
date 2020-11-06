import { on } from 'ts-action-immer';
import { reducer } from 'ts-action';
import { setActivity, setNotepads, setStudentAttendance } from './actions';
import { StudentAttendance } from '../../code/interfaces/studentAttendance';
import { Activity } from '../../code/interfaces/activity';
import { Notepads } from '../../code/interfaces/notepads';

export interface State {
  studentAttendance: StudentAttendance[];
  activity: Activity[];
  notepads: Notepads | undefined;
}

export const initialState: State = {
  studentAttendance: [],
  activity: [],
  notepads: undefined,
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
);
