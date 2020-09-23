import { Module } from '@nestjs/common';
import { AssignmentController } from './assignment.controller';
import { AssignmentService } from './assignment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assignment } from './entities/assignment.entity';
import { AssignmentGroup } from './entities/assignmentGroup.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Assignment, AssignmentGroup])],
  controllers: [AssignmentController],
  providers: [AssignmentService],
})
export class AssignmentModule {}
