import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PadAssignment } from './entities/padAssignment.entity';
import { PadMisc } from './entities/padMisc.entity';
import { NotepadsDto } from './dtos/notepadsDto';
import { Person } from './entities/person.entity';
import { SubmissionLatest } from './entities/submissionLatest.entity';
import { SubmissionFileDto } from './dtos/submissionFileDto';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(PadAssignment)
    private padAssignmentRepository: Repository<PadAssignment>,
    @InjectRepository(PadMisc)
    private padMiscRepository: Repository<PadMisc>,
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
    @InjectRepository(SubmissionLatest)
    private submissionLatestRepository: Repository<SubmissionLatest>,
  ) {}

  async findNotepadsByStudent(id: number): Promise<NotepadsDto> {
    const padAssignments = await this.padAssignmentRepository
      .createQueryBuilder('padAssignment')
      .select([
        'padAssignment.student as student',
        'padAssignment.assignment_id as assignment_id',
        'assignment.name as assignment_name',
        'padAssignment.stamp as stamp',
        'encode("content_sha"::bytea, \'escape\') as content_sha',
        'encode("token"::bytea, \'escape\') as token',
        'padAssignment.dirty as dirty',
        'encode("data"::bytea, \'escape\') as data',
      ])
      .leftJoin('content', 'content', 'content.sha = padAssignment.content_sha')
      .leftJoin(
        'assignment',
        'assignment',
        'assignment.id = padAssignment.assignment_id',
      )
      .where('padAssignment.student = :id', { id })
      .getRawMany();

    const padMisc = await this.padMiscRepository
      .createQueryBuilder('padMisc')
      .select([
        'padMisc.name as name',
        'padMisc.student as student',
        'padMisc.stamp as stamp',
        'encode("content_sha"::bytea, \'escape\') as content_sha',
        'encode("token"::bytea, \'escape\') as token',
        'padMisc.dirty as dirty',
        'encode("data"::bytea, \'escape\') as data',
      ])
      .leftJoin('content', 'content', 'content.sha = padMisc.content_sha')
      .where('padMisc.student = :id', { id })
      .getRawMany();

    return {
      padAssignments: padAssignments,
      padMisc: padMisc,
    };
  }

  findStudent(id: number): Promise<Person> {
    return this.personRepository.findOne(id);
  }

  findSubmissionFiles(id: number): Promise<SubmissionFileDto[]> {
    return this.submissionLatestRepository
      .createQueryBuilder('submission_latest')
      .select([
        'submission_latest.id as submission_id',
        'submission_latest.author as author',
        'submission_latest.assignment_id as assignment_id',
        'submission_latest.stamp as stamp',
        'submission_in.name as name',
        'encode("content_sha"::bytea, \'escape\') as content_sha',
        'encode("data"::bytea, \'escape\') as data',
      ])
      .leftJoin(
        'submission_in',
        'submission_in',
        'submission_in.submission_id = submission_latest.id',
      )
      .leftJoin('content', 'content', 'content.sha = submission_in.content_sha')
      .where('submission_latest.author = :id', { id })
      .getRawMany();
  }
}
