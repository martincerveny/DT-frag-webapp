import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { DispatchProps, StateProps } from './ReviewDetail';
import { ReviewDetail } from './ReviewDetail';
import { State } from '../../../store/combinedReducers';
import { fetchStudent } from '../../../store/student/actions';
import { fetchAnnotations, fetchReviews } from '../../../store/review/actions';
import { fetchAssignment } from '../../../store/assignment/actions';

const mapStateToProps = (state: State): StateProps => ({
  student: state.student.student,
  studentRequestState: state.student.studentRequestState,
  reviews: state.review.reviews,
  reviewsRequestState: state.review.reviewsRequestState,
  assignment: state.assignment.assignment,
  assignmentRequestState: state.assignment.assignmentRequestState,
  annotations: state.review.annotations,
  annotationsRequestState: state.review.annotationsRequestState,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  ...bindActionCreators(
    {
      fetchStudent,
      fetchReviews,
      fetchAssignment,
      fetchAnnotations,
    },
    dispatch,
  ),
});

export const ReviewDetailContainer = connect(mapStateToProps, mapDispatchToProps)(ReviewDetail);
