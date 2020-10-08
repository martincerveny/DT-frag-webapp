import { combineReducers } from 'redux';
import * as general from './general/reducers';
import * as assignment from './assignment/reducers';
import * as evaluation from './evaluation/reducers';
import * as seminar from './seminar/reducers';
import * as student from './student/reducers';

export interface State {
  general: general.State;
  assignment: assignment.State;
  evaluation: evaluation.State;
  seminar: seminar.State;
  student: student.State;
}

export const initialState: State = {
  general: general.initialState,
  assignment: assignment.initialState,
  evaluation: evaluation.initialState,
  seminar: seminar.initialState,
  student: student.initialState,
};

export const reducer = combineReducers<State>({
  general: general.generalReducer,
  assignment: assignment.assignmentReducer,
  evaluation: evaluation.evaluationReducer,
  seminar: seminar.seminarReducer,
  student: student.studentReducer,
});
