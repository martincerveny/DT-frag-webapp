import { Controller, Get, Param } from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { Assignment } from './entities/assignment.entity';
import { AssignmentGroup } from './entities/assignmentGroup.entity';
import { AssignmentPassed } from './entities/assignmentPassed.entity';

@Controller('api/assignments')
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  @Get()
  findAll(): Promise<Assignment[]> {
    return this.assignmentService.findAll();
  }

  @Get('/:id/groups')
  findGroupsByAssignment(@Param('id') id): Promise<AssignmentGroup[]> {
    return this.assignmentService.findGroupsByAssignment(id);
  }

  @Get('/passed')
  findAssignmentsPassed(): Promise<AssignmentPassed[]> {
    return this.assignmentService.findAssignmentsPassed();
  }
}
