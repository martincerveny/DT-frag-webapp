import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Review {
  @PrimaryColumn()
  id: number;

  @Column()
  author: number;

  @Column()
  submission_id: number;

  @Column({
    type: 'timestamp',
  })
  created: string;

  @Column({
    type: 'timestamp',
  })
  updated: string;
}
