import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { action, payload } from 'ts-action';
import { State } from './reducers';
import { Assignment } from '../../code/interfaces/assignment';
import { http } from '../../code/http';
import {AssignmentGroup} from "../../code/interfaces/assignmentGroup";

export enum ActionTypes {
  SET_ASSIGNMENTS = '[general] SET_ASSIGNMENTS',
  SET_ASSIGNMENT_GROUPS = '[general] SET_ASSIGNMENT_GROUPS',
}

export const setAssignments = action(ActionTypes.SET_ASSIGNMENTS, payload<{ assignments: Assignment[] }>());
export const setAssignmentGroups = action(ActionTypes.SET_ASSIGNMENT_GROUPS, payload<{ assignmentGroups: AssignmentGroup[] }>());

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
