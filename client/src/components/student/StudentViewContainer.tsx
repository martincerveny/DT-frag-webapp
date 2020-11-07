import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State } from '../../store/combinedReducers';
import { DispatchProps, StateProps, StudentView } from './StudentView';
import { fetchAssignments } from '../../store/assignment/actions';
import { fetchEvaluationsByStudent } from '../../store/evaluation/actions';
import {
  fetchActivityByStudent,
  fetchAttendanceByStudent,
  fetchNotepadsByStudent,
  fetchStudent,
} from '../../store/student/actions';

const mapStateToProps = (state: State): StateProps => ({
  assignments: state.assignment.assignments,
  evaluations: state.evaluation.evaluations,
  activity: state.student.activity,
  studentAttendance: state.student.studentAttendance,
  notepads: state.student.notepads,
  student: state.student.student,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  ...bindActionCreators(
    {
      fetchAssignments,
      fetchEvaluationsByStudent,
      fetchActivityByStudent,
      fetchAttendanceByStudent,
      fetchNotepadsByStudent,
      fetchStudent,
    },
    dispatch,
  ),
});

export const StudentViewContainer = connect(mapStateToProps, mapDispatchToProps)(StudentView);
