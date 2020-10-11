import { Controller, Get, Param } from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { Assignment } from './entities/assignment.entity';
import { AssignmentGroup } from './entities/assignmentGroup.entity';
import { AssignmentArrayDto } from './dtos/assignmentArrayDto';
import { Submission } from './entities/submission.entity';
import { SubmissionPerHourCountDto } from './dtos/submissionPerHourCountDto';

@Controller('api/assignments')
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  @Get()
  findAll(): Promise<Assignment[]> {
    return this.assignmentService.findAll();
  }

  @Get('/submissions/countperhour')
  findSubmissionCountPerHour(): Promise<SubmissionPerHourCountDto[]> {
    return this.assignmentService.findSubmissionCountPerHour();
  }

  @Get('/:id/groups')
  findGroupsByAssignment(@Param('id') id): Promise<AssignmentGroup[]> {
    return this.assignmentService.findGroupsByAssignment(id);
  }

  @Get('/groups')
  findAllAssignmentGroups(): Promise<AssignmentGroup[]> {
    return this.assignmentService.findAllAssignmentGroups();
  }

  @Get('/author')
  findAuthorAssignments(): Promise<AssignmentArrayDto> {
    return this.assignmentService.findAuthorAssignments();
  }

  @Get('/author')
  find(): Promise<AssignmentArrayDto> {
    return this.assignmentService.findAuthorAssignments();
  }
}
