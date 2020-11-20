import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class AttendanceDeadline {
  @PrimaryColumn({
    type: 'timestamp',
  })
  stamp: string;
}
