import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { action, payload } from 'ts-action';
import { State } from './reducers';
import { Assignment } from '../../code/interfaces/assignment';
import { api, showMessage } from '../../code/helpers/api';
import { AssignmentGroup } from '../../code/interfaces/assignmentGroup';
import { AssignmentArray } from '../../code/interfaces/assignmentArray';
import { SubmissionCountPerHour } from '../../code/interfaces/submissionCountPerHour';
import { LoadingState } from '../../code/enums/loading';

export enum ActionTypes {
  SET_ASSIGNMENTS = '[assignment] SET_ASSIGNMENTS',
  SET_ASSIGNMENT_GROUPS = '[assignment] SET_ASSIGNMENT_GROUPS',
  SET_AUTHOR_ASSIGNMENTS = '[assignment] SET_AUTHOR_ASSIGNMENTS',
  SET_SUBMISSION_COUNT_PER_HOUR = '[assignment] SET_SUBMISSION_COUNT_PER_HOUR',
  SET_ASSIGNMENT = '[assignment] SET_ASSIGNMENT',
  SET_ASSIGNMENT_REQUEST_STATE = '[assignment] SET_ASSIGNMENT_REQUEST_STATE',
}

export const setAssignments = action(ActionTypes.SET_ASSIGNMENTS, payload<{ assignments: Assignment[] }>());
export const setAssignmentGroups = action(
  ActionTypes.SET_ASSIGNMENT_GROUPS,
  payload<{ assignmentGroups: AssignmentGroup[] }>(),
);
export const setAuthorAssignments = action(
  ActionTypes.SET_AUTHOR_ASSIGNMENTS,
  payload<{ authorAssignments: AssignmentArray }>(),
);
export const setSubmissionCountPerHour = action(
  ActionTypes.SET_SUBMISSION_COUNT_PER_HOUR,
  payload<{ submissionCountPerHour: SubmissionCountPerHour[] }>(),
);
export const setAssignment = action(ActionTypes.SET_ASSIGNMENT, payload<{ assignment: Assignment }>());
export const setAssignmentRequestState = action(
  ActionTypes.SET_ASSIGNMENT_REQUEST_STATE,
  payload<{ assignmentRequestState: LoadingState }>(),
);

export const fetchAssignments: ActionCreator<ThunkAction<Promise<void>, State, any, any>> = () => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    await api
      .get('/assignments')
      .then(response => {
        dispatch(setAssignments({ assignments: response.data }));
      })
      .catch(error => {
        showMessage(error.message, 'error');
      });
  };
};

export const fetchAssignment: ActionCreator<ThunkAction<Promise<void>, State, any, any>> = (id: number) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(setAssignmentRequestState({ assignmentRequestState: LoadingState.Loading }));
    await api
      .get(`/assignments/detail/${id}`)
      .then(response => {
        dispatch(setAssignment({ assignment: response.data }));
        dispatch(setAssignmentRequestState({ assignmentRequestState: LoadingState.Success }));
      })
      .catch(error => {
        dispatch(setAssignmentRequestState({ assignmentRequestState: LoadingState.Failure }));
        showMessage(error.message, 'error');
      });
  };
};

export const fetchGroupsByAssignment: ActionCreator<ThunkAction<Promise<void>, State, any, any>> = (id: number) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    const response = await api.get(`/assignments/${id}/groups`);
    dispatch(setAssignmentGroups({ assignmentGroups: response.data }));
  };
};

export const fetchAllAssignmentGroups: ActionCreator<ThunkAction<Promise<void>, State, any, any>> = () => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    const response = await api.get(`/assignments/groups`);
    dispatch(setAssignmentGroups({ assignmentGroups: response.data }));
  };
};

export const fetchAuthorAssignments: ActionCreator<ThunkAction<Promise<void>, State, any, any>> = () => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    await api
      .get(`/assignments/author`)
      .then(response => {
        dispatch(setAuthorAssignments({ authorAssignments: response.data }));
      })
      .catch(error => {
        showMessage(error.message, 'error');
      });
  };
};

export const fetchSubmissionCountPerHour: ActionCreator<ThunkAction<Promise<void>, State, any, any>> = () => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    await api
      .get(`/assignments/submissions/countperhour`)
      .then(response => {
        dispatch(setSubmissionCountPerHour({ submissionCountPerHour: response.data }));
      })
      .catch(error => {
        showMessage(error.message, 'error');
      });
  };
};
