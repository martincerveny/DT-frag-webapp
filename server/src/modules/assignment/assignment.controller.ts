import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { Assignment } from './entities/assignment.entity';
import { AssignmentArrayDto } from './dtos/assignmentArrayDto';
import { SubmissionPerHourCountDto } from './dtos/submissionPerHourCountDto';
import { AuthGuard } from '../shared/guards/auth.guard';

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

  @Get('/submissions/countperhour')
  findSubmissionCountPerHour(): Promise<SubmissionPerHourCountDto[]> {
    return this.assignmentService.findSubmissionCountPerHour();
  }

  @Get('/author')
  findAuthorAssignments(): Promise<AssignmentArrayDto> {
    return this.assignmentService.findAuthorAssignments();
  }
}
