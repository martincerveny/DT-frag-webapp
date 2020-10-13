import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AssignmentModule } from './modules/assignment/assignment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assignment } from './modules/assignment/entities/assignment.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { AssignmentGroup } from './modules/assignment/entities/assignmentGroup.entity';
import { Evaluation } from './modules/evaluation/entities/evaluation.entity';
import { EvaluationModule } from './modules/evaluation/evaluation.module';
import { Seminar } from './modules/seminar/entities/seminar.entity';
import { SeminarModule } from './modules/seminar/seminar.module';
import { Enrollment } from './modules/seminar/entities/enrollment.entity';
import { Attendance } from './modules/seminar/entities/attendance.entity';
import { ActivityView } from './modules/seminar/entities/activityView.entity';
import { ActivityMax } from './modules/seminar/entities/activityMax.entity';
import { AssignmentPassed } from './modules/assignment/entities/assignmentPassed.entity';
import { Activity } from './modules/seminar/entities/activity.entity';
import { Submission } from './modules/assignment/entities/submission.entity';

const dbOptions: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  schema: process.env.DB_SCHEMA,
  entities: [
    Assignment,
    AssignmentGroup,
    Evaluation,
    Seminar,
    Enrollment,
    Attendance,
    ActivityView,
    ActivityMax,
    AssignmentPassed,
    Activity,
    Submission,
  ],
};

@Module({
  imports: [
    TypeOrmModule.forRoot(dbOptions),
    AssignmentModule,
    EvaluationModule,
    SeminarModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
