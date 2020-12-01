import { Column, ViewEntity } from 'typeorm';
import { bufferToStringTransformer } from '../../../code/helpers/transformers';

@ViewEntity({ name: 'eval_out_pts', synchronize: false })
export class Evaluation {
  @Column()
  eval_id: number;

  @Column()
  submission_id: number;

  @Column()
  assignment_id: number;

  @Column()
  stamp: string;

  @Column({
    type: 'bytea',
    transformer: bufferToStringTransformer,
  })
  group: string;

  @Column({
    type: 'text',
  })
  name: string;

  @Column()
  active: boolean;

  @Column()
  sequence: number;

  @Column({
    type: 'bytea',
    transformer: bufferToStringTransformer,
  })
  content_sha: string;

  @Column()
  passed: boolean;

  @Column()
  points: number;
}
