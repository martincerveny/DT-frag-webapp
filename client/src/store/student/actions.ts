import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { action, payload } from 'ts-action';
import { State } from './reducers';
import { http } from '../../code/http';
import { StudentAttendance } from '../../code/interfaces/studentAttendance';
import { Activity } from '../../code/interfaces/activity';

export enum ActionTypes {
  SET_STUDENT_ATTENDANCE = '[student] SET_STUDENT_ATTENDANCE',
  SET_ACTIVITY = '[student] SET_ACTIVITY',
}

export const setStudentAttendance = action(
  ActionTypes.SET_STUDENT_ATTENDANCE,
  payload<{ studentAttendance: StudentAttendance[] }>(),
);
export const setActivity = action(ActionTypes.SET_ACTIVITY, payload<{ activity: Activity[] }>());

export const fetchAttendanceByStudent: ActionCreator<ThunkAction<Promise<void>, State, any, any>> = (id: number) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    const response = await http.get(`/seminars/attendance/${id}/student`);
    dispatch(setStudentAttendance({ studentAttendance: response.data }));
  };
};

export const fetchActivityByStudent: ActionCreator<ThunkAction<Promise<void>, State, any, any>> = (id: number) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    const response = await http.get(`/seminars/activity/${id}/student`);
    dispatch(setActivity({ activity: response.data }));
  };
};
