import { Module } from '@nestjs/common';
import { SeminarController } from './seminar.controller';
import { SeminarService } from './seminar.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seminar } from './entities/seminar.entity';
import { Enrollment } from './entities/enrollment.entity';
import { Attendance } from './entities/attendance.entity';
import { ActivityView } from './entities/activityView.entity';
import { ActivityMax } from './entities/activityMax.entity';
import { Activity } from './entities/activity.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Seminar,
      Enrollment,
      Attendance,
      ActivityView,
      ActivityMax,
      Activity,
    ]),
  ],
  controllers: [SeminarController],
  providers: [SeminarService],
})
export class SeminarModule {}