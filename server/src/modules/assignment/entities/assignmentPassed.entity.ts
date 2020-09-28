import { Column, PrimaryColumn, ViewEntity } from 'typeorm';

@ViewEntity({ name: 'assignment_passed' })
export class AssignmentPassed {
  @PrimaryColumn()
  author: number;

  @Column()
  assignment_id: number;
}
