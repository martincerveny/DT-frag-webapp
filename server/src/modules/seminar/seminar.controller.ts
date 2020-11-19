import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { SeminarService } from './seminar.service';
import { Seminar } from './entities/seminar.entity';
import { Enrollment } from './entities/enrollment.entity';
import { Attendance } from './entities/attendance.entity';
import { ActivityViewDto } from './dtos/activityViewDto';
import { Activity } from './entities/activity.entity';
import { StudentAttendanceDto } from './dtos/studentAttendanceDto';
import { AuthGuard } from '../shared/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('api/seminars')
export class SeminarController {
  constructor(private readonly seminarService: SeminarService) {}

  @Get('/:id/teacher')
  findSeminarsByTeacher(@Param('id') id): Promise<Seminar[]> {
    return this.seminarService.findSeminarsByTeacher(id);
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

  @Get('/attendance/:id/student')
  findAttendanceByStudent(@Param('id') id): Promise<StudentAttendanceDto[]> {
    return this.seminarService.findAttendanceByStudent(id);
  }

  @Get('/activity')
  findActivityPts(): Promise<ActivityViewDto[]> {
    return this.seminarService.findActivityPts();
  }

  @Get('/activity/:id/student')
  findActivityByStudent(@Param('id') id): Promise<Activity[]> {
    return this.seminarService.findActivityByStudent(id);
  }
}
