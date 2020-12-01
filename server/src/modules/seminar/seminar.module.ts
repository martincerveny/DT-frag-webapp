import { Module } from '@nestjs/common';
import { SeminarController } from './seminar.controller';
import { SeminarService } from './seminar.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seminar } from './entities/seminar.entity';
import { Enrollment } from './entities/enrollment.entity';
import { Attendance } from './entities/attendance.entity';
import { ActivityPts } from './entities/activityPts.entity';
import { ActivityMax } from './entities/activityMax.entity';
import { AuthModule } from '../auth/auth.module';
import { AttendanceDeadline } from './entities/attendanceDeadline';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Seminar,
      Enrollment,
      Attendance,
      ActivityPts,
      ActivityMax,
      AttendanceDeadline,
    ]),
    AuthModule,
  ],
  controllers: [SeminarController],
  providers: [SeminarService],
})
export class SeminarModule {}
