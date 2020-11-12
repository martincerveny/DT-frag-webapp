import { Column, ViewEntity } from 'typeorm';

@ViewEntity({ name: 'submission_latest', synchronize: false })
export class SubmissionLatest {
  @Column()
  id: number;

  @Column()
  author: number;

  @Column()
  assignment_id: number;

  @Column({
    type: 'timestamp',
  })
  stamp: string;
}
