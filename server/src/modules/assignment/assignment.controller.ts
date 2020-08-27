import {Controller, Get} from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import {Assignment} from "./assignment.entity";

@Controller('api/assignments')
export class AssignmentController {
  constructor(private readonly assignmentsService: AssignmentService) {}

  @Get()
  findAll(): Promise<Assignment[]> {
    return this.assignmentsService.findAll();
  }
}
