import { on } from 'ts-action-immer';
import { reducer } from 'ts-action';
import {setActivity, setStudentAttendance} from './actions';
import {StudentAttendance} from "../../code/interfaces/studentAttendance";
import {Activity} from "../../code/interfaces/activity";

export interface State {
  studentAttendance: StudentAttendance[];
    activity: Activity[];
}

export const initialState: State = {
  studentAttendance: [],
    activity: []
};

export const studentReducer = reducer<State>(
  initialState,
  on(setStudentAttendance, (state: State, { payload }) => {
    state.studentAttendance = payload.studentAttendance;
  }),
    on(setActivity, (state: State, { payload }) => {
        state.activity = payload.activity;
    }),
);
