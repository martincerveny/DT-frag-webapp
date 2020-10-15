import { on } from 'ts-action-immer';
import { reducer } from 'ts-action';
import { logOut, setLoggedUser } from './actions';
import { cookieName } from '../../code/constants/api';
import { remove } from 'js-cookie';

export interface State {
  loggedUser: undefined | number;
}

export const initialState: State = {
  loggedUser: undefined,
};

export const generalReducer = reducer<State>(
  initialState,
  on(setLoggedUser, (state: State, { payload }) => {
    state.loggedUser = payload.user;
  }),
  on(logOut, (state: State, { payload }) => {
    state.loggedUser = payload;
    remove(cookieName);
  }),
);
