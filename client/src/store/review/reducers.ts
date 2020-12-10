import { on } from 'ts-action-immer';
import { reducer } from 'ts-action';
import { LoadingState } from '../../code/enums/loading';
import { ReviewRequest } from '../../code/interfaces/reviewRequest';
import { setReviewRequests, setReviewRequestsRequestState } from './actions';

export interface State {
  reviewRequests: ReviewRequest[];
  reviewRequestsRequestState: LoadingState;
}

export const initialState: State = {
  reviewRequests: [],
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
);
