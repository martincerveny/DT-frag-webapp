import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Activity {
  @PrimaryColumn()
  student: number;

  @Column()
  points: number;

  @Column({
    type: 'timestamp',
  })
  stamp: string;

  @Column({
    type: 'text',
  })
  note: string;
}
