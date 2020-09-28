import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Assignment } from './entities/assignment.entity';
import { Repository } from 'typeorm';
import { AssignmentGroup } from './entities/assignmentGroup.entity';
import { AssignmentPassed } from './entities/assignmentPassed.entity';

@Injectable()
export class AssignmentService {
  constructor(
    @InjectRepository(Assignment)
    private assignmentRepository: Repository<Assignment>,
    @InjectRepository(AssignmentGroup)
    private assignmentGroupRepository: Repository<AssignmentGroup>,
    @InjectRepository(AssignmentPassed)
    private assignmentPassedRepository: Repository<AssignmentPassed>,
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

  findAssignmentsPassed(): Promise<AssignmentPassed[]> {
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
      .getRawMany();
  }
}
