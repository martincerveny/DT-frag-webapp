import { Entity, PrimaryColumn } from 'typeorm';

@Entity('teacher_list')
export class Teacher {
  @PrimaryColumn()
  teacher: number;
}
