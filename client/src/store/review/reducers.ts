import { on } from 'ts-action-immer';
import { reducer } from 'ts-action';
import { LoadingState } from '../../code/enums/loading';
import { ReviewRequest } from '../../code/interfaces/reviewRequest';
import {
  setAnnotations,
  setAnnotationsRequestState,
  setReviewRequests,
  setReviewRequestsRequestState,
  setReviews,
  setReviewsRequestState,
} from './actions';
import { Review } from '../../code/interfaces/review';
import { Annotation } from '../../code/interfaces/annotation';

export interface State {
  reviewRequests: ReviewRequest[];
  reviews: Review[];
  annotations: Annotation[];
  annotationsRequestState: LoadingState;
  reviewsRequestState: LoadingState;
  reviewRequestsRequestState: LoadingState;
}

export const initialState: State = {
  reviewRequests: [],
  reviews: [],
  annotations: [],
  annotationsRequestState: LoadingState.Initial,
  reviewsRequestState: LoadingState.Initial,
  reviewRequestsRequestState: LoadingState.Initial,
};

export const reviewReducer = reducer<State>(
  initialState,
  on(setReviewRequests, (state: State, { payload }) => {
    state.reviewRequests = payload.reviewRequests;
  }),
  on(setReviewRequestsRequestState, (state: State, { payload }) => {
    state.reviewRequestsRequestState = payload.reviewRequestsRequestState;
  }),
  on(setReviews, (state: State, { payload }) => {
    state.reviews = payload.reviews;
  }),
  on(setReviewsRequestState, (state: State, { payload }) => {
    state.reviewsRequestState = payload.reviewsRequestState;
  }),
  on(setAnnotations, (state: State, { payload }) => {
    state.annotations = payload.annotations;
  }),
  on(setAnnotationsRequestState, (state: State, { payload }) => {
    state.annotationsRequestState = payload.annotationsRequestState;
  }),
);
