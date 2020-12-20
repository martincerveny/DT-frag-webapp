import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Evaluation } from './entities/evaluation.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { EvaluationDto } from './dtos/evaluationDto';
import { EvalLatest } from './entities/evalLatest.entity';

@Injectable()
export class EvaluationService {
  constructor(
    @InjectRepository(Evaluation)
    private evaluationRepository: Repository<Evaluation>,
    @InjectRepository(EvalLatest)
    private evalLatestRepository: Repository<EvalLatest>,
  ) {}

  /**
   * Returns all evaluations based on assignment ID
   */
  findEvalsByAssignment(id: number): Promise<EvaluationDto[]> {
    return this.getFindEvalsQuery()
      .where('eval_out_pts.assignment_id = :id', { id })
      .orderBy('eval_out_pts.stamp', 'ASC')
      .getRawMany();
  }

  /**
   * Returns all evaluations based on student ID
   */
  findEvalsByStudent(id: number): Promise<EvaluationDto[]> {
    return this.getFindEvalsQuery()
      .where('person.id = :id', { id })
      .getRawMany();
  }

  /**
   * Returns base query for evaluations
   */
  getFindEvalsQuery(): SelectQueryBuilder<EvalLatest> {
    return this.evalLatestRepository
      .createQueryBuilder('eval_latest')
      .select([
        'eval_out_pts.eval_id as eval_id',
        'eval_out_pts.submission_id as submission_id',
        'eval_out_pts.assignment_id as assignment_id',
        'eval_out_pts.stamp as stamp',
        'encode("group"::bytea, \'escape\') as group',
        'eval_out_pts.name as name',
        'eval_out_pts.active as active',
        'eval_out_pts.sequence as sequence',
        'encode("content_sha"::bytea, \'escape\') as content_sha',
        'eval_out_pts.passed as passed',
        'eval_out_pts.points points',
        'submission.author as author',
        'person.name as author_name',
        'encode("login"::bytea, \'escape\') as login',
        'encode("data"::bytea, \'escape\') as data',
      ])
      .leftJoin(
        'eval_out_pts',
        'eval_out_pts',
        'eval_latest.id = eval_out_pts.eval_id',
      )
      .leftJoin(
        'submission',
        'submission',
        'submission.id = eval_out_pts.submission_id',
      )
      .leftJoin('person', 'person', 'person.id = submission.author')
      .leftJoin('content', 'content', 'content.sha = eval_out_pts.content_sha');
  }
}
