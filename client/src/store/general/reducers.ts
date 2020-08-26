import { on } from 'ts-action-immer';
import { reducer } from 'ts-action';
import { setLoggedUser } from './actions';

export interface State {
  loggedUser: undefined;
}

export const initialState: State = {
  loggedUser: undefined,
};

export const generalReducer = reducer<State>(
  initialState,
  on(setLoggedUser, (state: State, { payload }) => {
    state.loggedUser = payload.user;
  }),
);
