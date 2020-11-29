import { on } from 'ts-action-immer';
import { reducer } from 'ts-action';
import {logOut, setLoggedUser, setLoginRequestState, setRefreshCookieState} from './actions';
import { removeUserFromCookie } from '../../code/helpers/api';
import { Person } from '../../code/interfaces/person';
import { LoadingState } from '../../code/enums/loading';

export interface State {
  loggedUser: undefined | Person;
  loginRequestState: LoadingState;
  refreshCookieState: LoadingState;
}

export const initialState: State = {
  loggedUser: undefined,
  loginRequestState: LoadingState.Initial,
  refreshCookieState: LoadingState.Initial,
};

export const authReducer = reducer<State>(
  initialState,
  on(setLoggedUser, (state: State, { payload }) => {
    state.loggedUser = payload.user;
  }),
  on(setLoginRequestState, (state: State, { payload }) => {
    state.loginRequestState = payload.loginRequestState;
  }),
  on(setRefreshCookieState, (state: State, { payload }) => {
    state.refreshCookieState = payload.refreshCookieState;
  }),
  on(logOut, (state: State, { payload }) => {
    state.loggedUser = payload;
    removeUserFromCookie();
  }),
);
