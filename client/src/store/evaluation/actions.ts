import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { action, payload } from 'ts-action';
import { State } from './reducers';
import { api, showMessage } from '../../code/helpers/api';
import { Evaluation } from '../../code/interfaces/evaluation';
import { LoadingState } from '../../code/enums/loading';

export enum ActionTypes {
  SET_EVALUATIONS = '[evaluation] SET_EVALUATIONS',
  SET_EVALUATIONS_REQUEST_STATE = '[evaluation] SET_EVALUATIONS_REQUEST_STATE',
}

export const setEvaluations = action(ActionTypes.SET_EVALUATIONS, payload<{ evaluations: Evaluation[] }>());
export const setEvaluationsRequestState = action(
  ActionTypes.SET_EVALUATIONS_REQUEST_STATE,
  payload<{ evaluationsRequestState: LoadingState }>(),
);

export const fetchEvaluations: ActionCreator<ThunkAction<Promise<void>, State, any, any>> = (id: number) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(setEvaluationsRequestState({ evaluationsRequestState: LoadingState.Loading }));
    await api
      .get(`/evals/${id}/assignment`)
      .then(response => {
        dispatch(setEvaluations({ evaluations: response.data }));
        dispatch(setEvaluationsRequestState({ evaluationsRequestState: LoadingState.Success }));
      })
      .catch(error => {
        dispatch(setEvaluationsRequestState({ evaluationsRequestState: LoadingState.Failure }));
        showMessage(error.message, 'error');
      });
  };
};

export const fetchEvaluationsByStudent: ActionCreator<ThunkAction<Promise<void>, State, any, any>> = (id: number) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(setEvaluationsRequestState({ evaluationsRequestState: LoadingState.Loading }));
    await api
      .get(`/evals/${id}/student`)
      .then(response => {
        dispatch(setEvaluations({ evaluations: response.data }));
        dispatch(setEvaluationsRequestState({ evaluationsRequestState: LoadingState.Success }));
      })
      .catch(error => {
        dispatch(setEvaluationsRequestState({ evaluationsRequestState: LoadingState.Failure }));
        showMessage(error.message, 'error');
      });
  };
};
