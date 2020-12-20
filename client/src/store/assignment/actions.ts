import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { action, payload } from 'ts-action';
import { State } from './reducers';
import { Assignment } from '../../code/interfaces/assignment';
import { api, showMessage } from '../../code/helpers/api';
import { SubmissionCountPerHour } from '../../code/interfaces/submissionCountPerHour';
import { LoadingState } from '../../code/enums/loading';
import { AuthorAssignment } from '../../code/interfaces/authorAssignment';
import { SubmissionCountPerDay } from '../../code/interfaces/submissionCountPerDay';

export enum ActionTypes {
  SET_ASSIGNMENTS = '[assignment] SET_ASSIGNMENTS',
  SET_PASSED_ASSIGNMENTS = '[assignment] SET_PASSED_ASSIGNMENTS',
  SET_FAILED_ASSIGNMENTS = '[assignment] SET_FAILED_ASSIGNMENTS',
  SET_SUBMISSION_COUNT_PER_HOUR = '[assignment] SET_SUBMISSION_COUNT_PER_HOUR',
  SET_SUBMISSION_COUNT_PER_DAY = '[assignment] SET_SUBMISSION_COUNT_PER_DAY',
  SET_ASSIGNMENT = '[assignment] SET_ASSIGNMENT',
  SET_ASSIGNMENT_REQUEST_STATE = '[assignment] SET_ASSIGNMENT_REQUEST_STATE',
  SET_PASSED_ASSIGNMENTS_REQUEST_STATE = '[assignment] SET_PASSED_ASSIGNMENTS_REQUEST_STATE',
  SET_FAILED_ASSIGNMENTS_REQUEST_STATE = '[assignment] SET_FAILED_ASSIGNMENTS_REQUEST_STATE',
}

export const setAssignments = action(ActionTypes.SET_ASSIGNMENTS, payload<{ assignments: Assignment[] }>());
export const setPassedAssignments = action(
  ActionTypes.SET_PASSED_ASSIGNMENTS,
  payload<{ passedAssignments: AuthorAssignment[] }>(),
);
export const setFailedAssignments = action(
  ActionTypes.SET_FAILED_ASSIGNMENTS,
  payload<{ failedAssignments: AuthorAssignment[] }>(),
);
export const setSubmissionCountPerHour = action(
  ActionTypes.SET_SUBMISSION_COUNT_PER_HOUR,
  payload<{ submissionCountPerHour: SubmissionCountPerHour[] }>(),
);
export const setSubmissionCountPerDay = action(
  ActionTypes.SET_SUBMISSION_COUNT_PER_DAY,
  payload<{ submissionCountPerDay: SubmissionCountPerDay[] }>(),
);
export const setAssignment = action(ActionTypes.SET_ASSIGNMENT, payload<{ assignment: Assignment }>());
export const setAssignmentRequestState = action(
  ActionTypes.SET_ASSIGNMENT_REQUEST_STATE,
  payload<{ assignmentRequestState: LoadingState }>(),
);
export const setPassedAssignmentsRequestState = action(
  ActionTypes.SET_PASSED_ASSIGNMENTS_REQUEST_STATE,
  payload<{ passedAssignmentRequestState: LoadingState }>(),
);
export const setFailedAssignmentsRequestState = action(
  ActionTypes.SET_FAILED_ASSIGNMENTS_REQUEST_STATE,
  payload<{ failedAssignmentRequestState: LoadingState }>(),
);

/**
 * Fetch all assignments
 */
export const fetchAssignments: ActionCreator<ThunkAction<Promise<void>, State, any, any>> = () => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(setAssignmentRequestState({ assignmentRequestState: LoadingState.Loading }));
    await api
      .get('/assignments')
      .then(response => {
        dispatch(setAssignments({ assignments: response.data }));
        dispatch(setAssignmentRequestState({ assignmentRequestState: LoadingState.Success }));
      })
      .catch(error => {
        dispatch(setAssignmentRequestState({ assignmentRequestState: LoadingState.Failure }));
        showMessage(error.message, 'error');
      });
  };
};

/**
 * Fetch one assignment based on ID
 */
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

/**
 * Fetch passed assignments
 */
export const fetchPassedAssignments: ActionCreator<ThunkAction<Promise<void>, State, any, any>> = () => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(setPassedAssignmentsRequestState({ passedAssignmentRequestState: LoadingState.Loading }));
    await api
      .get(`/assignments/passed`)
      .then(response => {
        dispatch(setPassedAssignments({ passedAssignments: response.data }));
        dispatch(setPassedAssignmentsRequestState({ passedAssignmentRequestState: LoadingState.Success }));
      })
      .catch(error => {
        dispatch(setPassedAssignmentsRequestState({ passedAssignmentRequestState: LoadingState.Failure }));
        showMessage(error.message, 'error');
      });
  };
};

/**
 * Fetch failed assignments
 */
export const fetchFailedAssignments: ActionCreator<ThunkAction<Promise<void>, State, any, any>> = () => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    dispatch(setFailedAssignmentsRequestState({ failedAssignmentRequestState: LoadingState.Loading }));
    await api
      .get(`/assignments/failed`)
      .then(response => {
        dispatch(setFailedAssignments({ failedAssignments: response.data }));
        dispatch(setFailedAssignmentsRequestState({ failedAssignmentRequestState: LoadingState.Success }));
      })
      .catch(error => {
        dispatch(setFailedAssignmentsRequestState({ failedAssignmentRequestState: LoadingState.Failure }));
        showMessage(error.message, 'error');
      });
  };
};

/**
 * Fetch submission count per each hour of the day
 */
export const fetchSubmissionCountPerHour: ActionCreator<ThunkAction<Promise<void>, State, any, any>> = () => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    await api
      .get(`/assignments/submissions/perHour`)
      .then(response => {
        dispatch(setSubmissionCountPerHour({ submissionCountPerHour: response.data }));
      })
      .catch(error => {
        showMessage(error.message, 'error');
      });
  };
};

/**
 * Fetch submission count per each day of the week
 */
export const fetchSubmissionCountPerDay: ActionCreator<ThunkAction<Promise<void>, State, any, any>> = () => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    await api
      .get(`/assignments/submissions/perDay`)
      .then(response => {
        dispatch(setSubmissionCountPerDay({ submissionCountPerDay: response.data }));
      })
      .catch(error => {
        showMessage(error.message, 'error');
      });
  };
};
