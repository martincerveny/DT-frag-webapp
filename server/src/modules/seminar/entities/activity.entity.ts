import { Column, PrimaryColumn, ViewEntity } from 'typeorm';

@ViewEntity({ name: 'activity_pts' })
export class Activity {
  @PrimaryColumn()
  student: number;

  @Column()
  points: number;
}
