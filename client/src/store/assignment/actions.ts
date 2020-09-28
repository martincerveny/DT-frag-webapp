import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { action, payload } from 'ts-action';
import { State } from './reducers';
import { Assignment } from '../../code/interfaces/assignment';
import { http } from '../../code/http';
import {AssignmentGroup} from "../../code/interfaces/assignmentGroup";
import {AssignmentArray} from "../../code/interfaces/assignmentArray";

export enum ActionTypes {
  SET_ASSIGNMENTS = '[assignment] SET_ASSIGNMENTS',
  SET_ASSIGNMENT_GROUPS = '[assignment] SET_ASSIGNMENT_GROUPS',
  SET_AUTHOR_ASSIGNMENTS = '[assignment] SET_AUTHOR_ASSIGNMENTS',
}

export const setAssignments = action(ActionTypes.SET_ASSIGNMENTS, payload<{ assignments: Assignment[] }>());
export const setAssignmentGroups = action(ActionTypes.SET_ASSIGNMENT_GROUPS, payload<{ assignmentGroups: AssignmentGroup[] }>());
export const setAuthorAssignments = action(ActionTypes.SET_AUTHOR_ASSIGNMENTS, payload<{ authorAssignments: AssignmentArray }>());

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

export const fetchAuthorAssignments: ActionCreator<ThunkAction<Promise<void>, State, any, any>> = () => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    const response = await http.get(`/assignments/author`);
    dispatch(setAuthorAssignments({ authorAssignments: response.data }));
  };
};

