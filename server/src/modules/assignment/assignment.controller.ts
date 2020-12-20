import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { Assignment } from './entities/assignment.entity';
import { SubmissionPerHourCountDto } from './dtos/submissionPerHourCountDto';
import { AuthGuard } from '../shared/guards/auth.guard';
import { AuthorAssignmentDto } from './dtos/authorAssignmentDto';
import { SubmissionPerDayCountDto } from './dtos/submissionPerDayCountDto';

/**
 * Routes for assignments
 */
@UseGuards(AuthGuard)
@Controller('api/assignments')
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  @Get()
  findAll(): Promise<Assignment[]> {
    return this.assignmentService.findAll();
  }

  @Get('/detail/:id')
  findAssignment(@Param('id') id): Promise<Assignment> {
    return this.assignmentService.findAssignment(id);
  }

  @Get('/submissions/perHour')
  findSubmissionCountPerHour(): Promise<SubmissionPerHourCountDto[]> {
    return this.assignmentService.findSubmissionCountPerHour();
  }

  @Get('/submissions/perDay')
  findSubmissionCountPerDay(): Promise<SubmissionPerDayCountDto[]> {
    return this.assignmentService.findSubmissionCountPerDay();
  }

  @Get('/passed')
  findPassedAssignments(): Promise<AuthorAssignmentDto[]> {
    return this.assignmentService.findPassedAssignments();
  }

  @Get('/failed')
  findFailedAssignments(): Promise<AuthorAssignmentDto[]> {
    return this.assignmentService.findFailedAssignments();
  }
}
