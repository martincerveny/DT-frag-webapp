import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { action, payload } from 'ts-action';
import { State } from './reducers';
import { get } from 'js-cookie';
import { cookieName } from '../../code/constants/api';
import { http, saveUserToCookie } from '../../code/helpers/http';
import { AxiosResponse } from 'axios';
import { LoggedUser } from '../../code/interfaces/loggedUser';
export enum ActionTypes {
  SET_LOGGED_USER = '[auth] SET_LOGGED_USER',
  LOG_OUT = '[auth] LOG_OUT',
}

export const setLoggedUser = action(ActionTypes.SET_LOGGED_USER, payload<{ user: number | undefined }>());
export const logOut = action(ActionTypes.LOG_OUT, payload<undefined>());

export const login: ActionCreator<ThunkAction<Promise<void>, State, any, any>> = (
  username: string,
  password: string,
) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    await http
      .post(`/auth/login`, {
        username,
        password,
      })
      .then((response: AxiosResponse<any>) => {
        if (response.data.status === 200) {
          dispatch(setLoggedUser({ user: response.data.data.id }));
          saveUserToCookie(response.data.token, response.data.data.id);
        } else {
          console.log('error', response.data.data.message);
        }
      });
  };
};

export const refreshUserFromCookie: ActionCreator<ThunkAction<Promise<void>, State, any, any>> = () => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    const userJson = get(cookieName);
    if (!userJson) {
      return;
    }
    const user = JSON.parse(userJson);
    console.log(user.id);
    //pre jednoduchost riesenia a otestovania ( len teraz) tu bude len number, potom tam bude number a xlogin, pri logine
    // sa nasetuje, pri refreshi sa vytiahne z person tabulky
    dispatch(setLoggedUser({ user: parseInt(user.id) }));
  };
};

export const logUserOut: ActionCreator<ThunkAction<Promise<void>, State, any, any>> = (id: number) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(logOut(undefined));
  };
};
