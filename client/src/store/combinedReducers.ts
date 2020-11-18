import { combineReducers } from 'redux';
import * as auth from './auth/reducers';
import * as assignment from './assignment/reducers';
import * as evaluation from './evaluation/reducers';
import * as seminar from './seminar/reducers';
import * as student from './student/reducers';

export interface State {
  auth: auth.State;
  assignment: assignment.State;
  evaluation: evaluation.State;
  seminar: seminar.State;
  student: student.State;
}

export const initialState: State = {
  auth: auth.initialState,
  assignment: assignment.initialState,
  evaluation: evaluation.initialState,
  seminar: seminar.initialState,
  student: student.initialState,
};

export const reducer = combineReducers<State>({
  auth: auth.authReducer,
  assignment: assignment.assignmentReducer,
  evaluation: evaluation.evaluationReducer,
  seminar: seminar.seminarReducer,
  student: student.studentReducer,
});
