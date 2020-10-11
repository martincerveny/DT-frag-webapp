import { State } from '../../../store/combinedReducers';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  fetchAssignments,
  fetchAuthorAssignments,
  fetchSubmissionCountPerHour,
} from '../../../store/assignment/actions';
import { AssignmentDashboard, DispatchProps, StateProps } from './AssignmentDashboard';
import { fetchEnrollments } from '../../../store/seminar/actions';

const mapStateToProps = (state: State): StateProps => ({
  assignments: state.assignment.assignments,
  authorAssignments: state.assignment.authorAssignments,
  allEnrollments: state.seminar.allEnrollments,
  submissionCountPerHour: state.assignment.submissionCountPerHour,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  ...bindActionCreators(
    {
      fetchAssignments,
      fetchAuthorAssignments,
      fetchEnrollments,
      fetchSubmissionCountPerHour,
    },
    dispatch,
  ),
});

export const AssignmentDashboardContainer = connect(mapStateToProps, mapDispatchToProps)(AssignmentDashboard);
