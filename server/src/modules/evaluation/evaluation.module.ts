import { Module } from '@nestjs/common';
import { EvaluationController } from './evaluation.controller';
import { EvaluationService } from './evaluation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evaluation } from './entities/evaluation.entity';
import { EvalLatest } from './entities/evalLatest.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Evaluation, EvalLatest])],
  controllers: [EvaluationController],
  providers: [EvaluationService],
})
export class EvaluationModule {}
