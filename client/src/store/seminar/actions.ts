import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { action, payload } from 'ts-action';
import { State } from './reducers';
import { http } from '../../code/http';
import { Seminar } from '../../code/interfaces/seminar';
import { Enrollment } from '../../code/interfaces/enrollment';
import { Attendance } from '../../code/interfaces/attendance';
import { Activity } from '../../code/interfaces/activity';
import { LoadingState } from '../../code/loading';

export enum ActionTypes {
  SET_SEMINARS = '[seminar] SET_SEMINARS',
  SET_SEMINAR_ENROLLMENTS = '[seminar] SET_SEMINAR_ENROLLMENTS',
  SET_ALL_ENROLLMENTS = '[seminar] SET_ALL_ENROLLMENTS',
  SET_ATTENDANCE = '[seminar] SET_ATTENDANCE',
  SET_ACTIVITY = '[seminar] SET_ACTIVITY',
  SET_LOADING_STATE = '[seminar] SET_LOADING_STATE',
}

export const setSeminars = action(ActionTypes.SET_SEMINARS, payload<{ seminars: Seminar[] }>());
export const setSeminarEnrollments = action(
  ActionTypes.SET_SEMINAR_ENROLLMENTS,
  payload<{ seminarEnrollments: Enrollment[] }>(),
);
export const setAllEnrollments = action(ActionTypes.SET_ALL_ENROLLMENTS, payload<{ allEnrollments: Enrollment[] }>());
export const setAttendance = action(ActionTypes.SET_ATTENDANCE, payload<{ attendance: Attendance[] }>());
export const setActivity = action(ActionTypes.SET_ACTIVITY, payload<{ activity: Activity[] }>());
export const setLoadingState = action(ActionTypes.SET_LOADING_STATE, payload<{ loadingState: LoadingState }>());

export const fetchSeminars: ActionCreator<ThunkAction<Promise<void>, State, any, any>> = (id: number) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    const response = await http.get(`/seminars/${id}/teacher`);
    dispatch(setSeminars({ seminars: response.data }));
  };
};

export const fetchEnrollments: ActionCreator<ThunkAction<Promise<void>, State, any, any>> = (ids?: string) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    let response;
    if (ids) {
      response = await http.get(`/seminars/enrollment?seminar=${ids}`);
      dispatch(setSeminarEnrollments({ seminarEnrollments: response.data }));
    } else {
      response = await http.get(`/seminars/enrollment`);
      dispatch(setAllEnrollments({ allEnrollments: response.data }));
    }
  };
};

export const fetchAttendance: ActionCreator<ThunkAction<Promise<void>, State, any, any>> = (ids: string) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    const response = await http.get(`/seminars/attendance?seminar=${ids}`);
    dispatch(setAttendance({ attendance: response.data }));
  };
};

export const fetchActivity: ActionCreator<ThunkAction<Promise<void>, State, any, any>> = () => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    const response = await http.get(`/seminars/activity`);
    dispatch(setActivity({ activity: response.data }));
  };
};
