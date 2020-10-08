import { Column, PrimaryColumn, ViewEntity } from 'typeorm';

@ViewEntity({ name: 'activity_pts' })
export class ActivityView {
  @PrimaryColumn()
  student: number;

  @Column()
  points: number;
}
