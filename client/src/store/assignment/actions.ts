import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { action, payload } from 'ts-action';
import { State } from './reducers';
import { Assignment } from '../../code/interfaces/assignment';
import { http } from '../../code/http';
import {AssignmentGroup} from "../../code/interfaces/assignmentGroup";
import {AssignmentPassed} from "../../code/interfaces/assignmentPassed";

export enum ActionTypes {
  SET_ASSIGNMENTS = '[assignment] SET_ASSIGNMENTS',
  SET_ASSIGNMENT_GROUPS = '[assignment] SET_ASSIGNMENT_GROUPS',
  SET_ASSIGNMENTS_PASSED = '[assignment] SET_ASSIGNMENTS_PASSED',
}

export const setAssignments = action(ActionTypes.SET_ASSIGNMENTS, payload<{ assignments: Assignment[] }>());
export const setAssignmentGroups = action(ActionTypes.SET_ASSIGNMENT_GROUPS, payload<{ assignmentGroups: AssignmentGroup[] }>());
export const setAssignmentsPassed = action(ActionTypes.SET_ASSIGNMENTS_PASSED, payload<{ assignmentsPassed: AssignmentPassed[] }>());

export const fetchAssignments: ActionCreator<ThunkAction<Promise<void>, State, any, any>> = () => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    const response = await http.get('/assignments');
    dispatch(setAssignments({ assignments: response.data }));
  };
};

export const fetchGroupsByAssignment: ActionCreator<ThunkAction<Promise<void>, State, any, any>> = (id: number) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    const response = await http.get(`/assignments/${id}/groups`);
    dispatch(setAssignmentGroups({ assignmentGroups: response.data }));
  };
};

export const fetchAssignmentsPassed: ActionCreator<ThunkAction<Promise<void>, State, any, any>> = () => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    const response = await http.get(`/assignments/passed`);
    dispatch(setAssignmentsPassed({ assignmentsPassed: response.data }));
  };
};

