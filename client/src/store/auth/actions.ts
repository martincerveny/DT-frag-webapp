import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { action, payload } from 'ts-action';
import { State } from './reducers';
import { api, receiveUserFromCookie, removeUserFromCookie, saveUserToCookie } from '../../code/helpers/api';
import { AxiosResponse } from 'axios';
import { Person } from '../../code/interfaces/person';

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
          console.log('login response');
          saveUserToCookie(response.data.token, response.data.data.id);
          dispatch(setLoggedUser({ user: response.data.data }));
        } else {
          console.log('error', response.data.data.message);
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
        console.log('refresh');
        dispatch(setLoggedUser({ user: response.data }));
      })
      .catch(error => {
        console.log(error);
        removeUserFromCookie();
      });
  };
};

export const logUserOut: ActionCreator<ThunkAction<Promise<void>, State, any, any>> = (id: number) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(logOut(undefined));
  };
};
