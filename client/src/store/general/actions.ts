import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { action, payload } from 'ts-action';
import { State } from './reducers';

export enum ActionTypes {
  SET_LOGGED_USER = '[general] SET_LOGGED_USER',
}

export const setLoggedUser = action(ActionTypes.SET_LOGGED_USER, payload<{ user: any }>());

export const performUserLogin: ActionCreator<ThunkAction<Promise<void>, State, any, any>> = () => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    //api call here
    dispatch(setLoggedUser({ user: undefined }));
  };
};
