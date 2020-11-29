import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seminar } from './entities/seminar.entity';
import { Repository } from 'typeorm';
import { Enrollment } from './entities/enrollment.entity';
import { Attendance } from './entities/attendance.entity';
import { ActivityView } from './entities/activityView.entity';
import { ActivityMax } from './entities/activityMax.entity';
import { ActivityViewDto } from './dtos/activityViewDto';
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
    @InjectRepository(ActivityView)
    private activityViewRepository: Repository<ActivityView>,
    @InjectRepository(ActivityMax)
    private activityMaxRepository: Repository<ActivityMax>,
    @InjectRepository(AttendanceDeadline)
    private attendanceDeadlineRepository: Repository<AttendanceDeadline>,
  ) {}

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

  findAttendanceDeadline(): Promise<AttendanceDeadline> {
    return this.attendanceDeadlineRepository.findOne();
  }

  async findActivityPts(): Promise<ActivityViewDto[]> {
    const activityMaxPoints = await this.activityMaxRepository.find();

    const studentPoints = await this.activityViewRepository
      .createQueryBuilder('activityView')
      .getMany();

    return studentPoints.map((s: ActivityView) => {
      return {
        student: s.student,
        points: s.points,
        maxPoints: activityMaxPoints[0].points,
      };
    });
  }
}
