import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seminar } from './entities/seminar.entity';
import { Repository } from 'typeorm';
import { Enrollment } from './entities/enrollment.entity';
import { Attendance } from './entities/attendance.entity';
import { ActivityPts } from './entities/activityPts.entity';
import { ActivityMax } from './entities/activityMax.entity';
import { AttendanceDeadline } from './entities/attendanceDeadline';

@Injectable()
export class SeminarService {
  constructor(
    @InjectRepository(Seminar)
    private seminarRepository: Repository<Seminar>,
    @InjectRepository(Enrollment)
    private enrollmentRepository: Repository<Enrollment>,
    @InjectRepository(Attendance)
    private attendanceRepository: Repository<Attendance>,
    @InjectRepository(ActivityPts)
    private activityPtsRepository: Repository<ActivityPts>,
    @InjectRepository(ActivityMax)
    private activityMaxRepository: Repository<ActivityMax>,
    @InjectRepository(AttendanceDeadline)
    private attendanceDeadlineRepository: Repository<AttendanceDeadline>,
  ) {}

  /**
   * Returns seminars based on tutor ID
   */
  findSeminarsByTutor(id: number): Promise<Seminar[]> {
    return this.seminarRepository
      .createQueryBuilder('seminar')
      .select([
        'seminar.id as id',
        'seminar.name as name',
        'tutor.teacher as teacher',
      ])
      .leftJoin('tutor', 'tutor', 'seminar.id = tutor.seminar_id')
      .where('tutor.teacher = :id', { id })
      .getRawMany();
  }

  /**
   * Returns enrollments by seminar ID
   */
  findEnrollmentBySeminar(ids: string): Promise<Enrollment[]> {
    const idsArray = ids.split(',');

    return this.enrollmentRepository
      .createQueryBuilder('enrollment')
      .select([
        'enrollment.seminar_id as seminar_id',
        'enrollment.student as student',
        'enrollment.completion as completion',
        'person.name as name',
      ])
      .leftJoin('person', 'person', 'person.id = enrollment.student')
      .where('enrollment.seminar_id IN (:...ids)', { ids: idsArray })
      .getRawMany();
  }

  /**
   * Returns all seminar enrollments
   */
  findAllEnrollments(): Promise<Enrollment[]> {
    return this.enrollmentRepository
      .createQueryBuilder('enrollment')
      .select([
        'enrollment.seminar_id as seminar_id',
        'enrollment.student as student',
        'enrollment.completion as completion',
        'person.name as name',
      ])
      .leftJoin('person', 'person', 'person.id = enrollment.student')
      .getRawMany();
  }

  /**
   * Returns attendance based on seminar ID's
   */
  findAttendanceBySeminar(ids: string): Promise<Attendance[]> {
    const idsArray = ids.split(',');

    return this.attendanceRepository
      .createQueryBuilder('attendance')
      .select([
        'attendance.student as student',
        'attendance.seminar_id as seminar_id',
        'attendance.date as date',
        'attendance.stamp as stamp',
      ])
      .where('attendance.seminar_id IN (:...ids)', { ids: idsArray })
      .getRawMany();
  }

  /**
   * Returns attendance deadline
   */
  findAttendanceDeadline(): Promise<AttendanceDeadline> {
    return this.attendanceDeadlineRepository.findOne();
  }

  /**
   * Returns all student activity points
   */
  async findActivityPts(): Promise<ActivityPts[]> {
    return this.activityPtsRepository.find();
  }

  /**
   * Returns max activity points
   */
  findActivityMaxPts(): Promise<ActivityMax> {
    return this.activityMaxRepository.findOne();
  }
}
