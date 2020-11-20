import { on } from 'ts-action-immer';
import { reducer } from 'ts-action';
import { logOut, setLoadingState, setLoggedUser, setRefreshCookieState } from './actions';
import { removeUserFromCookie } from '../../code/helpers/api';
import { Person } from '../../code/interfaces/person';
import { LoadingState } from '../../code/enums/loading';

export interface State {
  loggedUser: undefined | Person;
  loadingState: LoadingState;
  refreshCookieState: LoadingState;
}

export const initialState: State = {
  loggedUser: undefined,
  loadingState: LoadingState.Initial,
  refreshCookieState: LoadingState.Initial,
};

export const authReducer = reducer<State>(
  initialState,
  on(setLoggedUser, (state: State, { payload }) => {
    state.loggedUser = payload.user;
  }),
  on(setLoadingState, (state: State, { payload }) => {
    state.loadingState = payload.loadingState;
  }),
  on(setRefreshCookieState, (state: State, { payload }) => {
    state.refreshCookieState = payload.refreshCookieState;
  }),
  on(logOut, (state: State, { payload }) => {
    state.loggedUser = payload;
    removeUserFromCookie();
  }),
);
