import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { action, payload } from 'ts-action';
import { State } from './reducers';
import { api, showMessage } from '../../code/helpers/api';
import { LoadingState } from '../../code/enums/loading';
import { ReviewRequest } from '../../code/interfaces/reviewRequest';
import { Review } from '../../code/interfaces/review';
import { Annotation } from '../../code/interfaces/annotation';

export enum ActionTypes {
  SET_REVIEW_REQUESTS = '[review] SET_REVIEW_REQUESTS',
  SET_REVIEWS = '[review] SET_REVIEWS',
  SET_ANNOTATIONS = '[review] SET_ANNOTATIONS',
  SET_ANNOTATIONS_REQUEST_STATE = '[review] SET_ANNOTATIONS_REQUEST_STATE',
  SET_REVIEWS_REQUEST_STATE = '[review] SET_REVIEWS_REQUEST_STATE',
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
export const setReviews = action(ActionTypes.SET_REVIEWS, payload<{ reviews: Review[] }>());
export const setReviewsRequestState = action(
  ActionTypes.SET_REVIEWS_REQUEST_STATE,
  payload<{ reviewsRequestState: LoadingState }>(),
);
export const setAnnotations = action(ActionTypes.SET_ANNOTATIONS, payload<{ annotations: Annotation[] }>());
export const setAnnotationsRequestState = action(
  ActionTypes.SET_ANNOTATIONS_REQUEST_STATE,
  payload<{ annotationsRequestState: LoadingState }>(),
);

/**
 * Fetch review requests by assignment ID
 */
export const fetchReviewRequests: ActionCreator<ThunkAction<Promise<void>, State, any, any>> = (id: number) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(setReviewRequestsRequestState({ reviewRequestsRequestState: LoadingState.Loading }));
    await api
      .get(`/reviews/requests/assignment/${id}`)
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

/**
 * Fetch reviews by student ID and assignment ID
 */
export const fetchReviews: ActionCreator<ThunkAction<Promise<void>, State, any, any>> = (
  studentId: number,
  assignmentId: number,
) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(setReviewsRequestState({ reviewsRequestState: LoadingState.Loading }));
    await api
      .get(`/reviews/student/${studentId}/assignment/${assignmentId}`)
      .then(response => {
        dispatch(setReviews({ reviews: response.data }));
        dispatch(setReviewsRequestState({ reviewsRequestState: LoadingState.Success }));
      })
      .catch(error => {
        dispatch(setReviewsRequestState({ reviewsRequestState: LoadingState.Failure }));
        showMessage(error.message, 'error');
      });
  };
};

/**
 * Fetch annotations for reviews by review ID's
 */
export const fetchAnnotations: ActionCreator<ThunkAction<Promise<void>, State, any, any>> = (ids: string) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(setAnnotationsRequestState({ annotationsRequestState: LoadingState.Loading }));
    await api
      .get(`/reviews/annotations?reviews=${ids}`)
      .then(response => {
        dispatch(setAnnotations({ annotations: response.data }));
        dispatch(setAnnotationsRequestState({ annotationsRequestState: LoadingState.Success }));
      })
      .catch(error => {
        dispatch(setAnnotationsRequestState({ annotationsRequestState: LoadingState.Failure }));
        showMessage(error.message, 'error');
      });
  };
};
