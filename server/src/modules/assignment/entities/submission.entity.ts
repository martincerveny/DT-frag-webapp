import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Submission {
  @PrimaryColumn()
  id: number;

  @Column()
  author: number;

  @Column()
  assignment_id: number;

  @Column()
  stamp: string;
}
