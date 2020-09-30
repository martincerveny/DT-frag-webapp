import { Controller, Get, Param } from '@nestjs/common';
import { EvaluationService } from './evaluation.service';
import { EvaluationDto } from './dtos/evaluationDto';
import { Evaluation } from './entities/evaluation.entity';

@Controller('api/evals')
export class EvaluationController {
  constructor(private readonly evaluationService: EvaluationService) {}

  @Get('/:id/assignment')
  findEvalsByAssignment(@Param('id') id): Promise<EvaluationDto[]> {
    return this.evaluationService.findEvalsByAssignment(id);
  }
}
