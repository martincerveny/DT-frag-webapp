import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { action, payload } from 'ts-action';
import { State } from './reducers';
import { http } from '../../code/http';
import { Evaluation } from '../../code/interfaces/evaluation';

export enum ActionTypes {
  SET_EVALUATIONS = '[evaluation] SET_EVALUATIONS',
}

export const setEvaluations = action(ActionTypes.SET_EVALUATIONS, payload<{ evaluations: Evaluation[] }>());

export const fetchEvaluations: ActionCreator<ThunkAction<Promise<void>, State, any, any>> = (id: number) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    const response = await http.get(`/evals/${id}/assignment`);
    dispatch(setEvaluations({ evaluations: response.data }));
  };
};

export const fetchEvaluationsByStudent: ActionCreator<ThunkAction<Promise<void>, State, any, any>> = (id: number) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    const response = await http.get(`/evals/${id}/student`);
    dispatch(setEvaluations({ evaluations: response.data }));
  };
};
