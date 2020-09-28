import { Controller, Get, Param, Query } from '@nestjs/common';
import { SeminarService } from './seminar.service';
import { Seminar } from './entities/seminar.entity';
import { Enrollment } from './entities/enrollment.entity';
import { Attendance } from './entities/attendance.entity';
import { Activity } from './entities/activity.entity';
import { ActivityDto } from './dtos/activityDto';

@Controller('api/seminars')
export class SeminarController {
  constructor(private readonly seminarService: SeminarService) {}

  @Get('/:id/teacher')
  findSeminarsByTeacher(@Param('id') id): Promise<Seminar[]> {
    return this.seminarService.findSeminarsByTeacher(id);
  }

  @Get('/enrollment')
  findEnrollmentBySeminar(@Query() query): Promise<Enrollment[]> {
    return this.seminarService.findEnrollmentBySeminar(query.seminar);
  }

  @Get('/attendance')
  findAttendanceBySeminar(@Query() query): Promise<Attendance[]> {
    return this.seminarService.findAttendanceBySeminar(query.seminar);
  }

  @Get('/activity')
  findActivity(): Promise<ActivityDto[]> {
    return this.seminarService.findActivity();
  }
}
