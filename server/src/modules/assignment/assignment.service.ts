import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Assignment } from './entities/assignment.entity';
import { Repository } from 'typeorm';
import { AssignmentGroup } from './entities/assignmentGroup.entity';
import { AssignmentPassed } from './entities/assignmentPassed.entity';
import { AssignmentArrayDto } from './dtos/assignmentArrayDto';
import { Submission } from './entities/submission.entity';
import { SubmissionPerHourCountDto } from './dtos/submissionPerHourCountDto';

@Injectable()
export class AssignmentService {
  constructor(
    @InjectRepository(Assignment)
    private assignmentRepository: Repository<Assignment>,
    @InjectRepository(AssignmentGroup)
    private assignmentGroupRepository: Repository<AssignmentGroup>,
    @InjectRepository(AssignmentPassed)
    private assignmentPassedRepository: Repository<AssignmentPassed>,
    @InjectRepository(Submission)
    private submissionRepository: Repository<Submission>,
  ) {}

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

  findGroupsByAssignment(id: number): Promise<AssignmentGroup[]> {
    return this.assignmentGroupRepository.find({ assignment_id: id });
  }

  findAllAssignmentGroups(): Promise<AssignmentGroup[]> {
    return this.assignmentGroupRepository.find();
  }

  async findAuthorAssignments(): Promise<AssignmentArrayDto> {
    const assignmentsPassed = await this.assignmentPassedRepository
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
      .getRawMany();

    const assignmentNotPassed = await this.assignmentPassedRepository
      .query(`SELECT DISTINCT subm.author,
      subm.assignment_id,
      subm.name as assignment_name
      FROM (
      SELECT assignment_pts.author,
          person.login,
          assignment_pts.assignment_id,
          assignment.name
      FROM frag.person
      JOIN frag.assignment_pts ON assignment_pts.author = person.id
      JOIN frag.assignment ON assignment_pts.assignment_id = assignment.id
      JOIN frag.eval_pass ON eval_pass.assignment_id = assignment.id
      WHERE assignment_pts.points < eval_pass.points
      ) as subm`);

    return {
      assignmentsPassed: assignmentsPassed,
      assignmentsNotPassed: assignmentNotPassed,
    };
  }

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
      .groupBy("DATE_PART('hour',stamp)")
      .orderBy('hour', 'ASC')
      .getRawMany();
  }
}
