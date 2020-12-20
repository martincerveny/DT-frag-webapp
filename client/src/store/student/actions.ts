import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { action, payload } from 'ts-action';
import { State } from './reducers';
import { api, showMessage } from '../../code/helpers/api';
import { StudentAttendance } from '../../code/interfaces/studentAttendance';
import { Activity } from '../../code/interfaces/activity';
import { Notepads } from '../../code/interfaces/notepads';
import { Person } from '../../code/interfaces/person';
import { StudentFile } from '../../code/interfaces/studentFile';
import { LoadingState } from '../../code/enums/loading';

export enum ActionTypes {
  SET_STUDENT_ATTENDANCE = '[student] SET_STUDENT_ATTENDANCE',
  SET_ACTIVITY = '[student] SET_ACTIVITY',
  SET_NOTEPADS = '[student] SET_NOTEPADS',
  SET_STUDENT = '[student] SET_STUDENT',
  SET_STUDENT_REQUEST_STATE = '[student] SET_STUDENT_REQUEST_STATE',
  SET_STUDENT_ACTIVITY_REQUEST_STATE = '[student] SET_STUDENT_ACTIVITY_REQUEST_STATE',
  SET_STUDENT_ATTENDANCE_REQUEST_STATE = '[student] SET_STUDENT_ATTENDANCE_REQUEST_STATE',
  SET_STUDENT_NOTEPADS_REQUEST_STATE = '[student] SET_STUDENT_NOTEPADS_REQUEST_STATE',
  SET_STUDENT_FILES_REQUEST_STATE = '[student] SET_STUDENT_FILES_REQUEST_STATE',
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
export const setStudentRequestState = action(
  ActionTypes.SET_STUDENT_REQUEST_STATE,
  payload<{ studentRequestState: LoadingState }>(),
);
export const setStudentActivityRequestState = action(
  ActionTypes.SET_STUDENT_ACTIVITY_REQUEST_STATE,
  payload<{ studentActivityRequestState: LoadingState }>(),
);
export const setStudentAttendanceRequestState = action(
  ActionTypes.SET_STUDENT_ATTENDANCE_REQUEST_STATE,
  payload<{ studentAttendanceRequestState: LoadingState }>(),
);
export const setStudentNotepadsRequestState = action(
  ActionTypes.SET_STUDENT_NOTEPADS_REQUEST_STATE,
  payload<{ studentNotepadsRequestState: LoadingState }>(),
);
export const setStudentFilesRequestState = action(
  ActionTypes.SET_STUDENT_FILES_REQUEST_STATE,
  payload<{ studentFilesRequestState: LoadingState }>(),
);

export const fetchStudent: ActionCreator<ThunkAction<Promise<void>, State, any, any>> = (id: number) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(setStudentRequestState({ studentRequestState: LoadingState.Loading }));
    await api
      .get(`/student/detail/${id}`)
      .then(response => {
        dispatch(setStudent({ student: response.data }));
        dispatch(setStudentRequestState({ studentRequestState: LoadingState.Success }));
      })
      .catch(error => {
        dispatch(setStudentRequestState({ studentRequestState: LoadingState.Failure }));
        showMessage(error.message, 'error');
      });
  };
};

export const fetchAttendanceByStudent: ActionCreator<ThunkAction<Promise<void>, State, any, any>> = (id: number) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(setStudentAttendanceRequestState({ studentAttendanceRequestState: LoadingState.Loading }));
    await api
      .get(`/student/${id}/attendance`)
      .then(response => {
        dispatch(setStudentAttendance({ studentAttendance: response.data }));
        dispatch(setStudentAttendanceRequestState({ studentAttendanceRequestState: LoadingState.Success }));
      })
      .catch(error => {
        dispatch(setStudentAttendanceRequestState({ studentAttendanceRequestState: LoadingState.Failure }));
        showMessage(error.message, 'error');
      });
  };
};

export const fetchActivityByStudent: ActionCreator<ThunkAction<Promise<void>, State, any, any>> = (id: number) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(setStudentActivityRequestState({ studentActivityRequestState: LoadingState.Loading }));
    await api
      .get(`/student/${id}/activity`)
      .then(response => {
        dispatch(setActivity({ activity: response.data }));
        dispatch(setStudentActivityRequestState({ studentActivityRequestState: LoadingState.Success }));
      })
      .catch(error => {
        dispatch(setStudentActivityRequestState({ studentActivityRequestState: LoadingState.Failure }));
        showMessage(error.message, 'error');
      });
  };
};

export const fetchNotepadsByStudent: ActionCreator<ThunkAction<Promise<void>, State, any, any>> = (id: number) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(setStudentNotepadsRequestState({ studentNotepadsRequestState: LoadingState.Loading }));
    await api
      .get(`/student/${id}/notepads`)
      .then(response => {
        dispatch(setNotepads({ notepads: response.data }));
        dispatch(setStudentNotepadsRequestState({ studentNotepadsRequestState: LoadingState.Success }));
      })
      .catch(error => {
        dispatch(setStudentNotepadsRequestState({ studentNotepadsRequestState: LoadingState.Failure }));
        showMessage(error.message, 'error');
      });
  };
};

export const fetchSubmissionFilesByStudent: ActionCreator<ThunkAction<Promise<void>, State, any, any>> = (
  id: number,
) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(setStudentFilesRequestState({ studentFilesRequestState: LoadingState.Loading }));
    await api
      .get(`/student/files/${id}`)
      .then(response => {
        dispatch(setStudentFiles({ studentFiles: response.data }));
        dispatch(setStudentFilesRequestState({ studentFilesRequestState: LoadingState.Success }));
      })
      .catch(error => {
        dispatch(setStudentFilesRequestState({ studentFilesRequestState: LoadingState.Failure }));
        showMessage(error.message, 'error');
      });
  };
};
