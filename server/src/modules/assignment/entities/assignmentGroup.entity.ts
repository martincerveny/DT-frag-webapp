import { Column, PrimaryColumn, ViewEntity } from 'typeorm';
import { bufferToStringTransformer } from '../../../code/constants/transformers';

@ViewEntity({ name: 'eval_groups' })
export class AssignmentGroup {
  @PrimaryColumn()
  assignment_id: number;

  @Column({
    type: 'bytea',
    transformer: bufferToStringTransformer,
  })
  group: string;
}
