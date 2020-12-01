import { Column, PrimaryColumn, ViewEntity } from 'typeorm';

@ViewEntity({ name: 'activity_pts' })
export class ActivityPts {
  @PrimaryColumn()
  student: number;

  @Column()
  points: number;
}
