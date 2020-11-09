import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { action, payload } from 'ts-action';
import { State } from './reducers';
import { http } from '../../code/helpers/http';
import { StudentAttendance } from '../../code/interfaces/studentAttendance';
import { Activity } from '../../code/interfaces/activity';
import { Notepads } from '../../code/interfaces/notepads';
import { Person } from '../../code/interfaces/person';
import { StudentFile } from '../../code/interfaces/studentFile';

export enum ActionTypes {
  SET_STUDENT_ATTENDANCE = '[student] SET_STUDENT_ATTENDANCE',
  SET_ACTIVITY = '[student] SET_ACTIVITY',
  SET_NOTEPADS = '[student] SET_NOTEPADS',
  SET_STUDENT = '[student] SET_STUDENT',
  SET_STUDENT_FILES = '[student] SET_STUDENT_FILES',
}

export const setStudentAttendance = action(
  ActionTypes.SET_STUDENT_ATTENDANCE,
  payload<{ studentAttendance: StudentAttendance[] }>(),
);
export const setActivity = action(ActionTypes.SET_ACTIVITY, payload<{ activity: Activity[] }>());
export const setNotepads = action(ActionTypes.SET_NOTEPADS, payload<{ notepads: Notepads }>());
export const setStudent = action(ActionTypes.SET_STUDENT, payload<{ student: Person }>());
export const setStudentFiles = action(ActionTypes.SET_STUDENT_FILES, payload<{ studentFiles: StudentFile[] }>());

export const fetchStudent: ActionCreator<ThunkAction<Promise<void>, State, any, any>> = (id: number) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    const response = await http.get(`/student/detail/${id}`);
    dispatch(setStudent({ student: response.data }));
  };
};

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

export const fetchNotepadsByStudent: ActionCreator<ThunkAction<Promise<void>, State, any, any>> = (id: number) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    const response = await http.get(`/student/notepads/${id}`);
    dispatch(setNotepads({ notepads: response.data }));
  };
};

export const fetchSubmissionFilesByStudent: ActionCreator<ThunkAction<Promise<void>, State, any, any>> = (
  id: number,
) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    const response = await http.get(`/student/files/${id}`);
    dispatch(setStudentFiles({ studentFiles: response.data }));
  };
};
