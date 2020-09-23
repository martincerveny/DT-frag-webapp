import { Controller, Get, Param } from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { Assignment } from './entities/assignment.entity';
import { AssignmentGroup } from './entities/assignmentGroup.entity';

@Controller('api/assignments')
export class AssignmentController {
  constructor(private readonly assignmentsService: AssignmentService) {}

  @Get()
  findAll(): Promise<Assignment[]> {
    return this.assignmentsService.findAll();
  }

  @Get('/:id/groups')
  findGroupsByAssignment(@Param('id') id): Promise<AssignmentGroup[]> {
    return this.assignmentsService.findGroupsByAssignment(id);
  }
}
