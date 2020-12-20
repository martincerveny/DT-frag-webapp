import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { SeminarService } from './seminar.service';
import { Seminar } from './entities/seminar.entity';
import { Enrollment } from './entities/enrollment.entity';
import { Attendance } from './entities/attendance.entity';
import { AuthGuard } from '../shared/guards/auth.guard';
import { AttendanceDeadline } from './entities/attendanceDeadline';
import { ActivityMax } from './entities/activityMax.entity';
import { ActivityPts } from './entities/activityPts.entity';

@UseGuards(AuthGuard)
@Controller('api/seminars')
export class SeminarController {
  constructor(private readonly seminarService: SeminarService) {}

  @Get('/tutor/:id')
  findSeminarsByTutor(@Param('id') id): Promise<Seminar[]> {
    return this.seminarService.findSeminarsByTutor(id);
  }

  @Get('/enrollment')
  findEnrollmentBySeminar(@Query() query): Promise<Enrollment[]> {
    if (Object.keys(query).length === 0 && query.constructor === Object) {
      return this.seminarService.findAllEnrollments();
    }

    return this.seminarService.findEnrollmentBySeminar(query.seminar);
  }

  @Get('/attendance')
  findAttendanceBySeminar(@Query() query): Promise<Attendance[]> {
    return this.seminarService.findAttendanceBySeminar(query.seminar);
  }

  @Get('/attendanceDeadline')
  findAttendanceDeadline(): Promise<AttendanceDeadline> {
    return this.seminarService.findAttendanceDeadline();
  }

  @Get('/activity')
  findActivityPts(): Promise<ActivityPts[]> {
    return this.seminarService.findActivityPts();
  }

  @Get('/activityMax')
  findActivityMaxPts(): Promise<ActivityMax> {
    return this.seminarService.findActivityMaxPts();
  }
}
