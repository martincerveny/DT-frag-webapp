import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { action, payload } from 'ts-action';
import { State } from './reducers';
import { set, get } from 'js-cookie';
import { cookieExpiresInDays, cookieName } from '../../code/constants/api';
export enum ActionTypes {
  SET_LOGGED_USER = '[general] SET_LOGGED_USER',
  LOG_OUT = '[general] LOG_OUT',
}

export const setLoggedUser = action(ActionTypes.SET_LOGGED_USER, payload<{ user: number }>());
export const logOut = action(ActionTypes.LOG_OUT, payload<undefined>());

export const login: ActionCreator<ThunkAction<Promise<void>, State, any, any>> = (id: number) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(setLoggedUser({ user: id }));
    set(cookieName, id.toString(), {
      expires: cookieExpiresInDays,
    });
  };
};

export const refreshUserFromCookie: ActionCreator<ThunkAction<Promise<void>, State, any, any>> = () => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    const userId = get(cookieName);
    if (!userId) {
      return;
    }
    dispatch(setLoggedUser({ user: parseInt(userId) }));
  };
};

export const logUserOut: ActionCreator<ThunkAction<Promise<void>, State, any, any>> = (id: number) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(logOut(undefined));
  };
};
