import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { DispatchProps, StateProps } from './SeminarDashboard';
import { SeminarDashboard } from './SeminarDashboard';
import {
  fetchActivityMaxPts,
  fetchActivityPts,
  fetchAttendance,
  fetchAttendanceDeadline,
  fetchEnrollments,
  fetchSeminars,
} from '../../store/seminar/actions';
import { State } from '../../store/combinedReducers';
import { fetchAssignments, fetchAuthorAssignments } from '../../store/assignment/actions';

const mapStateToProps = (state: State): StateProps => ({
  seminars: state.seminar.seminars,
  seminarEnrollments: state.seminar.seminarEnrollments,
  attendance: state.seminar.attendance,
  activityPts: state.seminar.activityPts,
  authorAssignments: state.assignment.authorAssignments,
  seminarRequestState: state.seminar.seminarRequestState,
  assignments: state.assignment.assignments,
  attendanceDeadline: state.seminar.attendanceDeadline,
  activityMax: state.seminar.activityMax,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  ...bindActionCreators(
    {
      fetchSeminars,
      fetchEnrollments,
      fetchAttendance,
      fetchActivityPts,
      fetchAuthorAssignments,
      fetchAssignments,
      fetchAttendanceDeadline,
      fetchActivityMaxPts,
    },
    dispatch,
  ),
});

export const SeminarDashboardContainer = connect(mapStateToProps, mapDispatchToProps)(SeminarDashboard);
