import { State } from '../../../store/combinedReducers';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  fetchAssignments,
  fetchFailedAssignments,
  fetchPassedAssignments,
  fetchSubmissionCountPerHour,
} from '../../../store/assignment/actions';
import { AssignmentDashboard, DispatchProps, StateProps } from './AssignmentDashboard';
import { fetchEnrollments } from '../../../store/seminar/actions';

const mapStateToProps = (state: State): StateProps => ({
  assignments: state.assignment.assignments,
  passedAssignments: state.assignment.passedAssignments,
  failedAssignments: state.assignment.failedAssignments,
  allEnrollments: state.seminar.allEnrollments,
  submissionCountPerHour: state.assignment.submissionCountPerHour,
  assignmentRequestState: state.assignment.assignmentRequestState,
  passedAssignmentRequestState: state.assignment.passedAssignmentRequestState,
  failedAssignmentRequestState: state.assignment.failedAssignmentRequestState,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  ...bindActionCreators(
    {
      fetchAssignments,
      fetchPassedAssignments,
      fetchFailedAssignments,
      fetchEnrollments,
      fetchSubmissionCountPerHour,
    },
    dispatch,
  ),
});

export const AssignmentDashboardContainer = connect(mapStateToProps, mapDispatchToProps)(AssignmentDashboard);
