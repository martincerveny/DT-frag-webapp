import { Column, Entity, PrimaryColumn } from 'typeorm';
import { bufferToStringTransformer } from '../../../code/helpers/transformers';

@Entity({ name: 'eval_grade', synchronize: false })
export class EvalGrade {
  @PrimaryColumn()
  assignment_id: number;

  @PrimaryColumn()
  start: number;

  @PrimaryColumn()
  end: number;

  @Column({
    type: 'bytea',
    transformer: bufferToStringTransformer,
  })
  group: string;

  @Column({ type: 'text' })
  name;

  @Column()
  pass: number;

  @Column()
  fail: number;
}
