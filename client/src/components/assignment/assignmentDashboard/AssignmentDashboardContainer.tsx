import { State } from '../../../store/combinedReducers';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { fetchAssignments } from '../../../store/assignment/actions';
import { AssignmentDashboard, DispatchProps, StateProps } from './AssignmentDashboard';

const mapStateToProps = (state: State): StateProps => ({
  assignments: state.assignment.assignments,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  ...bindActionCreators(
    {
      fetchAssignments,
    },
    dispatch,
  ),
});

export const AssignmentDashboardContainer = connect(mapStateToProps, mapDispatchToProps)(AssignmentDashboard);
