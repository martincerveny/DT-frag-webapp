import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PadAssignment } from './entities/padAssignment.entity';
import { PadMisc } from './entities/padMisc.entity';
import { Person } from './entities/person.entity';
import { SubmissionLatest } from './entities/submissionLatest.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PadAssignment,
      PadMisc,
      Person,
      SubmissionLatest,
    ]),
    AuthModule,
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
