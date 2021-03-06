import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Assignment } from './entities/assignment.entity';
import { Repository } from 'typeorm';
import { AssignmentPassed } from './entities/assignmentPassed.entity';
import { Submission } from './entities/submission.entity';
import { SubmissionPerHourCountDto } from './dtos/submissionPerHourCountDto';
import { getConnection } from 'typeorm';
import { AuthorAssignmentDto } from './dtos/authorAssignmentDto';
import { SubmissionPerDayCountDto } from './dtos/submissionPerDayCountDto';

@Injectable()
export class AssignmentService {
  constructor(
    @InjectRepository(Assignment)
    private assignmentRepository: Repository<Assignment>,
    @InjectRepository(AssignmentPassed)
    private assignmentPassedRepository: Repository<AssignmentPassed>,
    @InjectRepository(Submission)
    private submissionRepository: Repository<Submission>,
  ) {}

  /**
   * Returns all assignments
   */
  findAll(): Promise<Assignment[]> {
    return this.assignmentRepository
      .createQueryBuilder('assignment')
      .select([
        'assignment.id as id',
        'assignment.name as name',
        'MAX(eval_grade.end) as end',
      ])
      .leftJoin(
        'eval_grade',
        'eval_grade',
        'assignment.id = eval_grade.assignment_id',
      )
      .where('utc_now() < eval_grade.end')
      .groupBy('assignment.id')
      .orderBy('assignment.id', 'ASC')
      .getRawMany();
  }

  /**
   * Returns one assignment based on ID
   */
  findAssignment(id: number): Promise<Assignment> {
    return this.assignmentRepository.findOne(id);
  }

  /**
   * Returns passed assignments
   */
  findPassedAssignments(): Promise<AuthorAssignmentDto[]> {
    return this.assignmentPassedRepository
      .createQueryBuilder('assignmentPassed')
      .select([
        'assignmentPassed.author as author',
        'assignmentPassed.assignment_id as assignment_id',
        'assignment.name as assignment_name',
      ])
      .leftJoinAndSelect(
        'assignment',
        'assignment',
        'assignment.id = assignmentPassed.assignment_id',
      )
      .where('author IN (SELECT student FROM enrollment)')
      .getRawMany();
  }

  /**
   * Returns failed assignments
   */
  async findFailedAssignments(): Promise<AuthorAssignmentDto[]> {
    const connection = getConnection();
    return connection.query(`SELECT DISTINCT subm.author,
      subm.assignment_id,
      subm.name as assignment_name
      FROM (
      SELECT assignment_pts.author,
          person.login,
          assignment_pts.assignment_id,
          assignment.name
      FROM person
      JOIN assignment_pts ON assignment_pts.author = person.id
      JOIN assignment ON assignment_pts.assignment_id = assignment.id
      JOIN eval_pass ON eval_pass.assignment_id = assignment.id
      WHERE assignment_pts.points < eval_pass.points
      ) as subm
      WHERE author IN (SELECT student FROM enrollment)
      `);
  }

  /**
   * Returns submission count per each hour of the day
   */
  findSubmissionCountPerHour(): Promise<SubmissionPerHourCountDto[]> {
    return this.submissionRepository
      .createQueryBuilder('submission')
      .select([
        "DATE_PART('hour',stamp) as hour",
        'COUNT(*) as submission_count',
      ])
      .where(
        'submission.assignment_id IN (SELECT assignment_id FROM assignment_now)',
      )
      .andWhere('author IN (SELECT student FROM enrollment)')
      .groupBy("DATE_PART('hour',stamp)")
      .orderBy('hour', 'ASC')
      .getRawMany();
  }

  /**
   * Returns submission count per each day of the week
   */
  findSubmissionCountPerDay(): Promise<SubmissionPerDayCountDto[]> {
    return this.submissionRepository
      .createQueryBuilder('submission')
      .select([
        "DATE_PART('isodow',stamp) as day",
        'COUNT(*) as submission_count',
      ])
      .where(
        'submission.assignment_id IN (SELECT assignment_id FROM assignment_now)',
      )
      .andWhere('author IN (SELECT student FROM enrollment)')
      .groupBy("DATE_PART('isodow',stamp)")
      .orderBy('day', 'ASC')
      .getRawMany();
  }
}
