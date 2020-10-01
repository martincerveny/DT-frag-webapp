export interface Evaluation {
  eval_id: number;
  submission_id: number;
  assignment_id: number;
  stamp: string;
  group: string;
  name: string;
  active: boolean;
  sequence: number;
  content_sha: string;
  passed: boolean;
  points: number;
  author: number;
  author_name: string;
  login: string;
  data: string
}
