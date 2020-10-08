import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Evaluation } from './entities/evaluation.entity';
import { Repository } from 'typeorm';
import { EvaluationDto } from './dtos/evaluationDto';

@Injectable()
export class EvaluationService {
  constructor(
    @InjectRepository(Evaluation)
    private evaluationRepository: Repository<Evaluation>,
  ) {}

  async findEvalsByAssignment(id: number): Promise<EvaluationDto[]> {
    const evals = await this.evaluationRepository
      .createQueryBuilder('eval_out_pts')
      .select([
        'eval_out_pts.*',
        'submission.author',
        'person.name as author_name',
        'person.login as login',
        'content.data',
      ])
      .leftJoin(
        'submission',
        'submission',
        'submission.id = eval_out_pts.submission_id',
      )
      .leftJoin('person', 'person', 'person.id = submission.author')
      .leftJoin('content', 'content', 'content.sha = eval_out_pts.content_sha')
      .where('eval_out_pts.assignment_id = :id', { id })
      .getRawMany();

    return evals.map((e: EvaluationDto) => {
      return {
        eval_id: e.eval_id,
        submission_id: e.submission_id,
        assignment_id: e.assignment_id,
        stamp: e.stamp,
        group: e.group.toString(),
        name: e.name,
        active: e.active,
        sequence: e.sequence,
        content_sha: e.content_sha.toString(),
        passed: e.passed,
        points: e.points,
        author: e.author,
        author_name: e.author_name,
        login: e.login.toString(),
        data: e.data.toString(),
      };
    });
  }

  async findEvalsByStudent(id: number): Promise<EvaluationDto[]> {
    const evals = await this.evaluationRepository
      .createQueryBuilder('eval_out_pts')
      .select([
        'eval_out_pts.*',
        'submission.author',
        'person.name as author_name',
        'person.login as login',
        'content.data',
      ])
      .leftJoin(
        'submission',
        'submission',
        'submission.id = eval_out_pts.submission_id',
      )
      .leftJoin('person', 'person', 'person.id = submission.author')
      .leftJoin('content', 'content', 'content.sha = eval_out_pts.content_sha')
      .where('person.id = :id', { id })
      .getRawMany();

    return evals.map((e: EvaluationDto) => {
      return {
        eval_id: e.eval_id,
        submission_id: e.submission_id,
        assignment_id: e.assignment_id,
        stamp: e.stamp,
        group: e.group.toString(),
        name: e.name,
        active: e.active,
        sequence: e.sequence,
        content_sha: e.content_sha.toString(),
        passed: e.passed,
        points: e.points,
        author: e.author,
        author_name: e.author_name,
        login: e.login.toString(),
        data: e.data.toString(),
      };
    });
  }
}
