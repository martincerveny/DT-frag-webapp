import { on } from 'ts-action-immer';
import { reducer } from 'ts-action';
import { setActivity, setNotepads, setStudent, setStudentAttendance } from './actions';
import { StudentAttendance } from '../../code/interfaces/studentAttendance';
import { Activity } from '../../code/interfaces/activity';
import { Notepads } from '../../code/interfaces/notepads';
import { Person } from '../../code/interfaces/person';

export interface State {
  studentAttendance: StudentAttendance[];
  activity: Activity[];
  notepads: Notepads | undefined;
  student: Person | undefined;
}

export const initialState: State = {
  studentAttendance: [],
  activity: [],
  notepads: undefined,
  student: undefined,
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
);
