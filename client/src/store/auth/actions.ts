import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { action, payload } from 'ts-action';
import { State } from './reducers';
import { api, receiveUserFromCookie, removeUserFromCookie, saveUserToCookie } from '../../code/helpers/api';
import { AxiosResponse } from 'axios';
import { Person } from '../../code/interfaces/person';
import { snackbarService } from 'uno-material-ui/dist';
import { t } from '../../code/helpers/translations';
import { LoadingState } from '../../code/enums/loading';

export enum ActionTypes {
  SET_LOGGED_USER = '[auth] SET_LOGGED_USER',
  LOG_OUT = '[auth] LOG_OUT',
  SET_LOADING_STATE = '[auth] SET_LOADING_STATE',
  SET_REFRESH_COOKIE_STATE = '[auth] SET_REFRESH_COOKIE_STATE',
}

export const setLoggedUser = action(ActionTypes.SET_LOGGED_USER, payload<{ user: Person | undefined }>());
export const logOut = action(ActionTypes.LOG_OUT, payload<undefined>());
export const setLoadingState = action(ActionTypes.SET_LOADING_STATE, payload<{ loadingState: LoadingState }>());
export const setRefreshCookieState = action(
  ActionTypes.SET_REFRESH_COOKIE_STATE,
  payload<{ refreshCookieState: LoadingState }>(),
);

export const login: ActionCreator<ThunkAction<Promise<void>, State, any, any>> = (
  username: string,
  password: string,
) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(setLoadingState({ loadingState: LoadingState.Loading }));

    await api
      .post(`/auth/login`, {
        username,
        password,
      })
      .then((response: AxiosResponse<any>) => {
        if (response.data.status === 200) {
          saveUserToCookie(response.data.token, response.data.data.id);
          dispatch(setLoggedUser({ user: response.data.data }));
          dispatch(setLoadingState({ loadingState: LoadingState.Success }));
          snackbarService.showSnackbar(t('auth.login'), 'success', 7000);
        } else {
          dispatch(setLoadingState({ loadingState: LoadingState.Failure }));
          snackbarService.showSnackbar(response.data.data.message, 'error', 7000);
        }
      });
  };
};

export const refreshUserFromCookie: ActionCreator<ThunkAction<Promise<void>, State, any, any>> = () => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(setRefreshCookieState({ refreshCookieState: LoadingState.Loading }));
    const user = receiveUserFromCookie();
    if (!user) {
      dispatch(setRefreshCookieState({ refreshCookieState: LoadingState.Failure }));
      return;
    }

    await api
      .get(`/auth/tutor/${user.id}`)
      .then(response => {
        dispatch(setLoggedUser({ user: response.data }));
        dispatch(setRefreshCookieState({ refreshCookieState: LoadingState.Success }));
      })
      .catch(error => {
        snackbarService.showSnackbar(error.message, 'error', 7000);
        removeUserFromCookie();
        dispatch(setRefreshCookieState({ refreshCookieState: LoadingState.Failure }));
      });
  };
};

export const logUserOut: ActionCreator<ThunkAction<Promise<void>, State, any, any>> = (id: number) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(logOut(undefined));
    snackbarService.showSnackbar(t('auth.logout'), 'success', 7000);
  };
};
