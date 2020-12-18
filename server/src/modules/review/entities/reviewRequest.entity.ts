import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class ReviewRequest {
  @PrimaryColumn()
  student: number;

  @PrimaryColumn()
  assignment_id: number;

  @Column()
  count: number;

  @Column()
  stamp: string;
}
