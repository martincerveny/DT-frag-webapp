import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Enrollment {
  @PrimaryColumn()
  student: number;

  @Column()
  seminar_id: number;

  @Column({
    type: 'text',
  })
  completion: string;
}
