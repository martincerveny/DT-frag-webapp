import { State } from '../../../store/combinedReducers';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { fetchAssignment } from '../../../store/assignment/actions';
import { AssignmentView, DispatchProps, StateProps } from './AssignmentView';
import { fetchEvaluations } from '../../../store/evaluation/actions';

const mapStateToProps = (state: State): StateProps => ({
  evaluations: state.evaluation.evaluations,
  assignment: state.assignment.assignment,
  assignmentRequestState: state.assignment.assignmentRequestState,
  evaluationsRequestState: state.evaluation.evaluationsRequestState,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  ...bindActionCreators(
    {
      fetchEvaluations,
      fetchAssignment,
    },
    dispatch,
  ),
});

export const AssignmentViewContainer = connect(mapStateToProps, mapDispatchToProps)(AssignmentView);
