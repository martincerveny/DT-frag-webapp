import { State } from '../../../store/combinedReducers';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { fetchGroupsByAssignment } from '../../../store/assignment/actions';
import { AssignmentView, DispatchProps, StateProps } from './AssignmentView';

const mapStateToProps = (state: State): StateProps => ({
  assignmentGroups: state.assignment.assignmentGroups,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  ...bindActionCreators(
    {
      fetchGroupsByAssignment,
    },
    dispatch,
  ),
});

export const AssignmentViewContainer = connect(mapStateToProps, mapDispatchToProps)(AssignmentView);
