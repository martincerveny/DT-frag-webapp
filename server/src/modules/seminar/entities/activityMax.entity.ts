import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class ActivityMax {
  @PrimaryColumn()
  points: number;
}
