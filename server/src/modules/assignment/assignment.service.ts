import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Assignment } from './entities/assignment.entity';
import { Repository } from 'typeorm';
import { AssignmentGroup } from './entities/assignmentGroup.entity';

@Injectable()
export class AssignmentService {
  constructor(
    @InjectRepository(Assignment)
    private assignmentRepository: Repository<Assignment>,
    @InjectRepository(AssignmentGroup)
    private assignmentGroupRepository: Repository<AssignmentGroup>,
  ) {}

  findAll(): Promise<Assignment[]> {
    return this.assignmentRepository.find();
  }

  findGroupsByAssignment(id: number): Promise<AssignmentGroup[]> {
    console.log(this.assignmentGroupRepository.find({ assignment_id: id }));
    return this.assignmentGroupRepository.find({ assignment_id: id });
  }
}
