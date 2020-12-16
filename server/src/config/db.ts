import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { Assignment } from '../modules/assignment/entities/assignment.entity';
import { Evaluation } from '../modules/evaluation/entities/evaluation.entity';
import { Seminar } from '../modules/seminar/entities/seminar.entity';
import { Enrollment } from '../modules/seminar/entities/enrollment.entity';
import { Attendance } from '../modules/seminar/entities/attendance.entity';
import { ActivityPts } from '../modules/seminar/entities/activityPts.entity';
import { ActivityMax } from '../modules/seminar/entities/activityMax.entity';
import { AssignmentPassed } from '../modules/assignment/entities/assignmentPassed.entity';
import { Activity } from '../modules/student/entities/activity.entity';
import { Submission } from '../modules/assignment/entities/submission.entity';
import { EvalLatest } from '../modules/evaluation/entities/evalLatest.entity';
import { PadAssignment } from '../modules/student/entities/padAssignment.entity';
import { PadMisc } from '../modules/student/entities/padMisc.entity';
import { Person } from '../modules/student/entities/person.entity';
import { SubmissionLatest } from '../modules/student/entities/submissionLatest.entity';
import { Teacher } from '../modules/auth/entities/teacher.entity';
import { AttendanceDeadline } from '../modules/seminar/entities/attendanceDeadline';
import { ActiveRequests } from '../modules/review/entities/activeRequests.entity';
import { Review } from '../modules/review/entities/review.entity';
import { Annotation } from '../modules/review/entities/annotation.entity';

export const dbConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  schema: process.env.DB_SCHEMA,
  entities: [
    Assignment,
    Evaluation,
    Seminar,
    Enrollment,
    Attendance,
    ActivityPts,
    ActivityMax,
    AssignmentPassed,
    Activity,
    Submission,
    EvalLatest,
    PadAssignment,
    PadMisc,
    Person,
    SubmissionLatest,
    Teacher,
    AttendanceDeadline,
    ActiveRequests,
    Review,
    Annotation,
  ],
};
