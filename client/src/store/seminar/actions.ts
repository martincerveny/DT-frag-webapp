import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { action, payload } from 'ts-action';
import { State } from './reducers';
import { api, showMessage } from '../../code/helpers/api';
import { Seminar } from '../../code/interfaces/seminar';
import { Enrollment } from '../../code/interfaces/enrollment';
import { Attendance } from '../../code/interfaces/attendance';
import { ActivityPts } from '../../code/interfaces/activityPts';
import { LoadingState } from '../../code/enums/loading';
import { AttendanceDeadline } from '../../code/interfaces/attendanceDeadline';
import {ActivityMax} from "../../code/interfaces/activityMax";

export enum ActionTypes {
  SET_SEMINARS = '[seminar] SET_SEMINARS',
  SET_SEMINAR_ENROLLMENTS = '[seminar] SET_SEMINAR_ENROLLMENTS',
  SET_ALL_ENROLLMENTS = '[seminar] SET_ALL_ENROLLMENTS',
  SET_ATTENDANCE = '[seminar] SET_ATTENDANCE',
  SET_ATTENDANCE_DEADLINE = '[seminar] SET_ATTENDANCE_DEADLINE',
  SET_ACTIVITY_PTS = '[seminar] SET_ACTIVITY_PTS',
  SET_ACTIVITY_MAX_PTS = '[seminar] SET_ACTIVITY_MAX_PTS',
  SET_SEMINAR_REQUEST_STATE = '[seminar] SET_SEMINAR_REQUEST_STATE',
}

export const setSeminars = action(ActionTypes.SET_SEMINARS, payload<{ seminars: Seminar[] }>());
export const setSeminarEnrollments = action(
  ActionTypes.SET_SEMINAR_ENROLLMENTS,
  payload<{ seminarEnrollments: Enrollment[] }>(),
);
export const setAllEnrollments = action(ActionTypes.SET_ALL_ENROLLMENTS, payload<{ allEnrollments: Enrollment[] }>());
export const setAttendance = action(ActionTypes.SET_ATTENDANCE, payload<{ attendance: Attendance[] }>());
export const setAttendanceDeadline = action(
  ActionTypes.SET_ATTENDANCE_DEADLINE,
  payload<{ attendanceDeadline: AttendanceDeadline }>(),
);
export const setActivityPts = action(ActionTypes.SET_ACTIVITY_PTS, payload<{ activityPts: ActivityPts[] }>());
export const setActivityMaxPts = action(ActionTypes.SET_ACTIVITY_MAX_PTS, payload<{ activityMax: ActivityMax }>());
export const setSeminarRequestState = action(
  ActionTypes.SET_SEMINAR_REQUEST_STATE,
  payload<{ seminarRequestState: LoadingState }>(),
);

export const fetchSeminars: ActionCreator<ThunkAction<Promise<void>, State, any, any>> = (id: number) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    setSeminarRequestState({ seminarRequestState: LoadingState.Loading });
    await api
      .get(`/seminars/tutor/${id}`)
      .then(response => {
        setSeminarRequestState({ seminarRequestState: LoadingState.Success });
        dispatch(setSeminars({ seminars: response.data }));
      })
      .catch(error => {
        showMessage(error.message, 'error');
      });
  };
};

export const fetchEnrollments: ActionCreator<ThunkAction<Promise<void>, State, any, any>> = (ids?: string) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    try {
      if (ids) {
        await api.get(`/seminars/enrollment?seminar=${ids}`).then(response => {
          dispatch(setSeminarEnrollments({ seminarEnrollments: response.data }));
        });
      } else {
        await api.get(`/seminars/enrollment`).then(response => {
          dispatch(setAllEnrollments({ allEnrollments: response.data }));
        });
      }
    } catch (error) {
      await showMessage(error.message, 'error');
    }
  };
};

export const fetchAttendance: ActionCreator<ThunkAction<Promise<void>, State, any, any>> = (ids: string) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    await api
      .get(`/seminars/attendance?seminar=${ids}`)
      .then(response => {
        dispatch(setAttendance({ attendance: response.data }));
      })
      .catch(error => {
        showMessage(error.message, 'error');
      });
  };
};

export const fetchAttendanceDeadline: ActionCreator<ThunkAction<Promise<void>, State, any, any>> = () => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    await api
      .get(`/seminars/attendanceDeadline`)
      .then(response => {
        dispatch(setAttendanceDeadline({ attendanceDeadline: response.data }));
      })
      .catch(error => {
        showMessage(error.message, 'error');
      });
  };
};

export const fetchActivityPts: ActionCreator<ThunkAction<Promise<void>, State, any, any>> = () => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    await api
      .get(`/seminars/activity`)
      .then(response => {
        dispatch(setActivityPts({ activityPts: response.data }));
      })
      .catch(error => {
        showMessage(error.message, 'error');
      });
  };
};

export const fetchActivityMaxPts: ActionCreator<ThunkAction<Promise<void>, State, any, any>> = () => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    await api
        .get(`/seminars/activityMax`)
        .then(response => {
          dispatch(setActivityMaxPts({ activityMax: response.data }));
        })
        .catch(error => {
          showMessage(error.message, 'error');
        });
  };
};
