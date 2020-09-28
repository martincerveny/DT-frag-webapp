import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { DispatchProps, StateProps } from './SeminarDashboard';
import { SeminarDashboard } from './SeminarDashboard';
import {
  fetchActivity,
  fetchAttendance,
  fetchEnrollments,
  fetchSeminars,
  setLoadingState,
} from '../../store/seminar/actions';
import { State } from '../../store/combinedReducers';
import { fetchAssignments, fetchAuthorAssignments } from '../../store/assignment/actions';

const mapStateToProps = (state: State): StateProps => ({
  seminars: state.seminar.seminars,
  enrollments: state.seminar.enrollments,
  loggedUser: state.general.loggedUser,
  attendance: state.seminar.attendance,
  activity: state.seminar.activity,
  authorAssignments: state.assignment.authorAssignments,
  loadingState: state.seminar.loadingState,
  assignments: state.assignment.assignments,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  ...bindActionCreators(
    {
      fetchSeminars,
      fetchEnrollments,
      fetchAttendance,
      fetchActivity,
      fetchAuthorAssignments,
      setLoadingState,
      fetchAssignments,
    },
    dispatch,
  ),
});

export const SeminarDashboardContainer = connect(mapStateToProps, mapDispatchToProps)(SeminarDashboard);
