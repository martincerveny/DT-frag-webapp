import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { action, payload } from 'ts-action';
import { State } from './reducers';
import { api, showMessage } from '../../code/helpers/api';
import { Evaluation } from '../../code/interfaces/evaluation';
import { LoadingState } from '../../code/enums/loading';
import { ReviewRequest } from '../../code/interfaces/reviewRequest';

export enum ActionTypes {
  SET_REVIEW_REQUESTS = '[review] SET_REVIEW_REQUESTS',
  SET_REVIEW_REQUESTS_REQUEST_STATE = '[review] SET_REVIEW_REQUESTS_REQUEST_STATE',
}

export const setReviewRequests = action(
  ActionTypes.SET_REVIEW_REQUESTS,
  payload<{ reviewRequests: ReviewRequest[] }>(),
);
export const setReviewRequestsRequestState = action(
  ActionTypes.SET_REVIEW_REQUESTS_REQUEST_STATE,
  payload<{ reviewRequestsRequestState: LoadingState }>(),
);

export const fetchReviewRequests: ActionCreator<ThunkAction<Promise<void>, State, any, any>> = (id: number) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(setReviewRequestsRequestState({ reviewRequestsRequestState: LoadingState.Loading }));
    await api
      .get(`/reviews/requests/${id}/assignment`)
      .then(response => {
        dispatch(setReviewRequests({ reviewRequests: response.data }));
        dispatch(setReviewRequestsRequestState({ reviewRequestsRequestState: LoadingState.Success }));
      })
      .catch(error => {
        dispatch(setReviewRequestsRequestState({ reviewRequestsRequestState: LoadingState.Failure }));
        showMessage(error.message, 'error');
      });
  };
};
