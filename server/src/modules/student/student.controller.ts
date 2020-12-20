import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { StudentService } from './student.service';
import { NotepadsDto } from './dtos/notepadsDto';
import { Person } from './entities/person.entity';
import { SubmissionFileDto } from './dtos/submissionFileDto';
import { AuthGuard } from '../shared/guards/auth.guard';
import { StudentAttendanceDto } from './dtos/studentAttendanceDto';
import { Activity } from './entities/activity.entity';

@UseGuards(AuthGuard)
@Controller('api/student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get('/:id/notepads')
  findNotepadsByStudent(@Param('id') id): Promise<NotepadsDto> {
    return this.studentService.findNotepadsByStudent(id);
  }

  @Get('/detail/:id')
  findStudent(@Param('id') id): Promise<Person> {
    return this.studentService.findStudent(id);
  }

  @Get('/files/:id')
  findSubmissionFiles(@Param('id') id): Promise<SubmissionFileDto[]> {
    return this.studentService.findSubmissionFiles(id);
  }

  @Get('/:id/attendance')
  findAttendanceByStudent(@Param('id') id): Promise<StudentAttendanceDto[]> {
    return this.studentService.findAttendanceByStudent(id);
  }

  @Get('/:id/activity')
  findActivityByStudent(@Param('id') id): Promise<Activity[]> {
    return this.studentService.findActivityByStudent(id);
  }
}
