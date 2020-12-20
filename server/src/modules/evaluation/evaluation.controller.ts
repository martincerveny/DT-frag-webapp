import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { EvaluationService } from './evaluation.service';
import { EvaluationDto } from './dtos/evaluationDto';
import { AuthGuard } from '../shared/guards/auth.guard';

/**
 * Routes for evaluations
 */
@UseGuards(AuthGuard)
@Controller('api/evals')
export class EvaluationController {
  constructor(private readonly evaluationService: EvaluationService) {}

  @Get('/assignment/:id')
  findEvalsByAssignment(@Param('id') id): Promise<EvaluationDto[]> {
    return this.evaluationService.findEvalsByAssignment(id);
  }

  @Get('/student/:id')
  findEvalsByStudent(@Param('id') id): Promise<EvaluationDto[]> {
    return this.evaluationService.findEvalsByStudent(id);
  }
}
