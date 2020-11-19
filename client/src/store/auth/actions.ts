import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { action, payload } from 'ts-action';
import { State } from './reducers';
import { api, receiveUserFromCookie, removeUserFromCookie, saveUserToCookie } from '../../code/helpers/api';
import { AxiosResponse } from 'axios';
import { Person } from '../../code/interfaces/person';
import { snackbarService } from 'uno-material-ui/dist';
import { t } from '../../code/helpers/translations';

export enum ActionTypes {
  SET_LOGGED_USER = '[auth] SET_LOGGED_USER',
  LOG_OUT = '[auth] LOG_OUT',
}

export const setLoggedUser = action(ActionTypes.SET_LOGGED_USER, payload<{ user: Person | undefined }>());
export const logOut = action(ActionTypes.LOG_OUT, payload<undefined>());

export const login: ActionCreator<ThunkAction<Promise<void>, State, any, any>> = (
  username: string,
  password: string,
) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    await api
      .post(`/auth/login`, {
        username,
        password,
      })
      .then((response: AxiosResponse<any>) => {
        if (response.data.status === 200) {
          saveUserToCookie(response.data.token, response.data.data.id);
          dispatch(setLoggedUser({ user: response.data.data }));
          snackbarService.showSnackbar(t('auth.login'), 'success', 7000);
        } else {
          snackbarService.showSnackbar(response.data.data.message, 'error', 7000);
        }
      });
  };
};

export const refreshUserFromCookie: ActionCreator<ThunkAction<Promise<void>, State, any, any>> = () => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    const user = receiveUserFromCookie();
    if (!user) {
      return;
    }

    await api
      .get(`/auth/tutor/${user.id}`)
      .then(response => {
        dispatch(setLoggedUser({ user: response.data }));
      })
      .catch(error => {
        snackbarService.showSnackbar(error.message, 'error', 7000);
        removeUserFromCookie();
      });
  };
};

export const logUserOut: ActionCreator<ThunkAction<Promise<void>, State, any, any>> = (id: number) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(logOut(undefined));
    snackbarService.showSnackbar(t('auth.logout'), 'success', 7000);
  };
};
