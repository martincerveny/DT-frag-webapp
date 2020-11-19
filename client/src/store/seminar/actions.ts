import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { action, payload } from 'ts-action';
import { State } from './reducers';
import { api } from '../../code/helpers/api';
import { Seminar } from '../../code/interfaces/seminar';
import { Enrollment } from '../../code/interfaces/enrollment';
import { Attendance } from '../../code/interfaces/attendance';
import { ActivityPts } from '../../code/interfaces/activityPts';
import { LoadingState } from '../../code/enums/loading';

export enum ActionTypes {
  SET_SEMINARS = '[seminar] SET_SEMINARS',
  SET_SEMINAR_ENROLLMENTS = '[seminar] SET_SEMINAR_ENROLLMENTS',
  SET_ALL_ENROLLMENTS = '[seminar] SET_ALL_ENROLLMENTS',
  SET_ATTENDANCE = '[seminar] SET_ATTENDANCE',
  SET_ACTIVITY_PTS = '[seminar] SET_ACTIVITY_PTS',
  SET_LOADING_STATE = '[seminar] SET_LOADING_STATE',
}

export const setSeminars = action(ActionTypes.SET_SEMINARS, payload<{ seminars: Seminar[] }>());
export const setSeminarEnrollments = action(
  ActionTypes.SET_SEMINAR_ENROLLMENTS,
  payload<{ seminarEnrollments: Enrollment[] }>(),
);
export const setAllEnrollments = action(ActionTypes.SET_ALL_ENROLLMENTS, payload<{ allEnrollments: Enrollment[] }>());
export const setAttendance = action(ActionTypes.SET_ATTENDANCE, payload<{ attendance: Attendance[] }>());
export const setActivityPts = action(ActionTypes.SET_ACTIVITY_PTS, payload<{ activityPts: ActivityPts[] }>());
export const setLoadingState = action(ActionTypes.SET_LOADING_STATE, payload<{ loadingState: LoadingState }>());

export const fetchSeminars: ActionCreator<ThunkAction<Promise<void>, State, any, any>> = (id: number) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    const response = await api.get(`/seminars/${id}/teacher`);
    dispatch(setSeminars({ seminars: response.data }));
  };
};

export const fetchEnrollments: ActionCreator<ThunkAction<Promise<void>, State, any, any>> = (ids?: string) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    let response;
    if (ids) {
      response = await api.get(`/seminars/enrollment?seminar=${ids}`);
      dispatch(setSeminarEnrollments({ seminarEnrollments: response.data }));
    } else {
      response = await api.get(`/seminars/enrollment`);
      dispatch(setAllEnrollments({ allEnrollments: response.data }));
    }
  };
};

export const fetchAttendance: ActionCreator<ThunkAction<Promise<void>, State, any, any>> = (ids: string) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    const response = await api.get(`/seminars/attendance?seminar=${ids}`);
    dispatch(setAttendance({ attendance: response.data }));
  };
};

export const fetchActivityPts: ActionCreator<ThunkAction<Promise<void>, State, any, any>> = () => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    const response = await api.get(`/seminars/activity`);
    dispatch(setActivityPts({ activityPts: response.data }));
  };
};
