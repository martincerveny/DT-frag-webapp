import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AssignmentModule } from './modules/assignment/assignment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EvaluationModule } from './modules/evaluation/evaluation.module';
import { SeminarModule } from './modules/seminar/seminar.module';
import { StudentModule } from './modules/student/student.module';
import { AuthModule } from './modules/auth/auth.module';
import { dbConfig } from './config/db';
import { ReviewModule } from './modules/review/review.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    AssignmentModule,
    EvaluationModule,
    SeminarModule,
    StudentModule,
    AuthModule,
    ReviewModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
