import { State } from '../../../store/combinedReducers';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { fetchAuthorAssignments, fetchGroupsByAssignment } from '../../../store/assignment/actions';
import { AssignmentView, DispatchProps, StateProps } from './AssignmentView';
import { fetchEvaluations } from '../../../store/evaluation/actions';

const mapStateToProps = (state: State): StateProps => ({
  assignmentGroups: state.assignment.assignmentGroups,
  evaluations: state.evaluation.evaluations,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  ...bindActionCreators(
    {
      fetchGroupsByAssignment,
      fetchEvaluations,
      fetchAuthorAssignments,
    },
    dispatch,
  ),
});

export const AssignmentViewContainer = connect(mapStateToProps, mapDispatchToProps)(AssignmentView);
