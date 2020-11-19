import { on } from 'ts-action-immer';
import { reducer } from 'ts-action';
import { logOut, setLoggedUser } from './actions';
import {removeUserFromCookie} from "../../code/helpers/api";
import {Person} from "../../code/interfaces/person";

export interface State {
  loggedUser: undefined | Person;
}

export const initialState: State = {
  loggedUser: undefined,
};

export const authReducer = reducer<State>(
  initialState,
  on(setLoggedUser, (state: State, { payload }) => {
    state.loggedUser = payload.user;
  }),
  on(logOut, (state: State, { payload }) => {
    state.loggedUser = payload;
    removeUserFromCookie();
  }),
);
