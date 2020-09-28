import { on } from 'ts-action-immer';
import { reducer } from 'ts-action';
import { setEvaluations } from './actions';
import { Evaluation } from '../../code/interfaces/evaluation';

export interface State {
  evaluations: Evaluation[];
}

export const initialState: State = {
  evaluations: [],
};

export const evaluationReducer = reducer<State>(
  initialState,
  on(setEvaluations, (state: State, { payload }) => {
    state.evaluations = payload.evaluations;
  }),
);
