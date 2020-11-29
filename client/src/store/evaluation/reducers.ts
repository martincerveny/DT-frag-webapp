import { on } from 'ts-action-immer';
import { reducer } from 'ts-action';
import { setEvaluations, setEvaluationsRequestState } from './actions';
import { Evaluation } from '../../code/interfaces/evaluation';
import { LoadingState } from '../../code/enums/loading';

export interface State {
  evaluations: Evaluation[];
  evaluationsRequestState: LoadingState;
}

export const initialState: State = {
  evaluations: [],
  evaluationsRequestState: LoadingState.Initial,
};

export const evaluationReducer = reducer<State>(
  initialState,
  on(setEvaluations, (state: State, { payload }) => {
    state.evaluations = payload.evaluations;
  }),
  on(setEvaluationsRequestState, (state: State, { payload }) => {
    state.evaluationsRequestState = payload.evaluationsRequestState;
  }),
);
