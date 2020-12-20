import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { action, payload } from 'ts-action';
import { State } from './reducers';
import {
  api,
  receiveUserFromCookie,
  removeUserFromCookie,
  saveUserToCookie,
  showMessage,
} from '../../code/helpers/api';
import { AxiosResponse } from 'axios';
import { Person } from '../../code/interfaces/person';
import { t } from '../../code/helpers/translations';
import { LoadingState } from '../../code/enums/loading';

export enum ActionTypes {
  SET_LOGGED_USER = '[auth] SET_LOGGED_USER',
  LOG_OUT = '[auth] LOG_OUT',
  SET_LOGIN_REQUEST_STATE = '[auth] SET_LOGIN_REQUEST_STATE',
  SET_REFRESH_COOKIE_STATE = '[auth] SET_REFRESH_COOKIE_STATE',
}

export const setLoggedUser = action(ActionTypes.SET_LOGGED_USER, payload<{ user: Person | undefined }>());
export const logOut = action(ActionTypes.LOG_OUT, payload<undefined>());
export const setLoginRequestState = action(
  ActionTypes.SET_LOGIN_REQUEST_STATE,
  payload<{ loginRequestState: LoadingState }>(),
);
export const setRefreshCookieState = action(
  ActionTypes.SET_REFRESH_COOKIE_STATE,
  payload<{ refreshCookieState: LoadingState }>(),
);

/**
 * Make a login process
 */
export const login: ActionCreator<ThunkAction<Promise<void>, State, any, any>> = (
  username: string,
  password: string,
) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(setLoginRequestState({ loginRequestState: LoadingState.Loading }));

    await api
      .post(`/auth/login`, {
        username,
        password,
      })
      .then((response: AxiosResponse<any>) => {
        if (response.data.status === 200) {
          saveUserToCookie(response.data.token, response.data.data.id);
          dispatch(setLoggedUser({ user: response.data.data }));
          dispatch(setLoginRequestState({ loginRequestState: LoadingState.Success }));
          showMessage(t('auth.login'), 'success');
        } else {
          dispatch(setLoginRequestState({ loginRequestState: LoadingState.Failure }));
          showMessage(response.data.data.message ?? t('app.timeout'), 'error');
        }
      })
      .catch(error => {
        dispatch(setLoginRequestState({ loginRequestState: LoadingState.Failure }));
        showMessage(error.message, 'error');
      });
  };
};

/**
 * Refresh user from cookie for authorization
 */
export const refreshUserFromCookie: ActionCreator<ThunkAction<Promise<void>, State, any, any>> = () => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(setRefreshCookieState({ refreshCookieState: LoadingState.Loading }));
    const user = receiveUserFromCookie();
    if (!user) {
      dispatch(setRefreshCookieState({ refreshCookieState: LoadingState.Failure }));
      return;
    }

    await api
      .get(`/auth/teacher/${user.id}`)
      .then(response => {
        dispatch(setLoggedUser({ user: response.data }));
        dispatch(setRefreshCookieState({ refreshCookieState: LoadingState.Success }));
      })
      .catch(error => {
        showMessage(error.message, 'error');
        removeUserFromCookie();
        dispatch(setRefreshCookieState({ refreshCookieState: LoadingState.Failure }));
      });
  };
};

/**
 * Make a logout process
 */
export const logUserOut: ActionCreator<ThunkAction<Promise<void>, State, any, any>> = (id: number) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(logOut(undefined));
    await showMessage(t('auth.logout'), 'success');
  };
};
