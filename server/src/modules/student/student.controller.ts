import { Controller, Get, Param } from '@nestjs/common';
import { StudentService } from './student.service';
import { NotepadsDto } from './dtos/notepadsDto';
import { Person } from './entities/person.entity';

@Controller('api/student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get('/notepads/:id')
  findNotepadsByStudent(@Param('id') id): Promise<NotepadsDto> {
    return this.studentService.findNotepadsByStudent(id);
  }

  @Get('/detail/:id')
  findStudent(@Param('id') id): Promise<Person> {
    return this.studentService.findStudent(id);
  }
}
