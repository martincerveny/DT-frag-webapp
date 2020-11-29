import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Tutor {
  @PrimaryColumn()
  seminar_id: number;

  @Column()
  teacher: number;
}
