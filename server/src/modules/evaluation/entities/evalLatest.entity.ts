import { Column, ViewEntity } from 'typeorm';

@ViewEntity({ name: 'eval_latest', synchronize: false })
export class EvalLatest {
  @Column()
  id: number;

  @Column()
  submission_id: number;

  @Column()
  stamp: string;
}
