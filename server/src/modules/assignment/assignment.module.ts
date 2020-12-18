import { Module } from '@nestjs/common';
import { AssignmentController } from './assignment.controller';
import { AssignmentService } from './assignment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assignment } from './entities/assignment.entity';
import { AssignmentPassed } from './entities/assignmentPassed.entity';
import { Submission } from './entities/submission.entity';
import { AuthModule } from '../auth/auth.module';
import { EvalGrade } from '../evaluation/entities/evalGrade.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Assignment,
      AssignmentPassed,
      Submission,
      EvalGrade,
    ]),
    AuthModule,
  ],
  controllers: [AssignmentController],
  providers: [AssignmentService],
})
export class AssignmentModule {}
