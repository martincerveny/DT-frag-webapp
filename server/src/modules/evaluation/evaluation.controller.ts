import { Controller, Get, Param } from '@nestjs/common';
import { EvaluationService } from './evaluation.service';
import { EvaluationDto } from './dtos/evaluationDto';

@Controller('api/evals')
export class EvaluationController {
  constructor(private readonly evaluationService: EvaluationService) {}

  @Get('/:id/assignment')
  findEvalsByAssignment(@Param('id') id): Promise<EvaluationDto[]> {
    return this.evaluationService.findEvalsByAssignment(id);
  }

  @Get('/:id/student')
  findEvalsByStudent(@Param('id') id): Promise<EvaluationDto[]> {
    return this.evaluationService.findEvalsByStudent(id);
  }
}
