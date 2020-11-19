import { on } from 'ts-action-immer';
import { reducer } from 'ts-action';
import { logOut, setLoadingState, setLoggedUser } from './actions';
import { removeUserFromCookie } from '../../code/helpers/api';
import { Person } from '../../code/interfaces/person';
import { LoadingState } from '../../code/enums/loading';

export interface State {
  loggedUser: undefined | Person;
  loadingState: LoadingState;
}

export const initialState: State = {
  loggedUser: undefined,
  loadingState: LoadingState.Initial,
};

export const authReducer = reducer<State>(
  initialState,
  on(setLoggedUser, (state: State, { payload }) => {
    state.loggedUser = payload.user;
  }),
  on(setLoadingState, (state: State, { payload }) => {
    state.loadingState = payload.loadingState;
  }),
  on(logOut, (state: State, { payload }) => {
    state.loggedUser = payload;
    removeUserFromCookie();
  }),
);
