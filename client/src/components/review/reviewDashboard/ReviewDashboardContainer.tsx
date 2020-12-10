import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { DispatchProps, StateProps } from './ReviewDashboard';
import { ReviewDashboard } from './ReviewDashboard';
import { State } from '../../../store/combinedReducers';
import { fetchAssignments } from '../../../store/assignment/actions';
import { fetchReviewRequests } from '../../../store/review/actions';

const mapStateToProps = (state: State): StateProps => ({
  assignments: state.assignment.assignments,
  reviewRequests: state.review.reviewRequests,
  reviewRequestsRequestState: state.review.reviewRequestsRequestState,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  ...bindActionCreators(
    {
      fetchAssignments,
      fetchReviewRequests,
    },
    dispatch,
  ),
});

export const ReviewDashboardContainer = connect(mapStateToProps, mapDispatchToProps)(ReviewDashboard);
