import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Attendance {
  @PrimaryColumn()
  student: number;

  @Column()
  seminar_id: number;

  @Column({
    type: 'date',
  })
  date: string;

  @Column({
    type: 'timestamp',
  })
  stamp: string;
}
