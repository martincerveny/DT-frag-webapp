import { Entity, Column, PrimaryColumn } from 'typeorm';
import { bufferToStringTransformer } from '../../../code/helpers/transformers';

@Entity()
export class PadAssignment {
  @PrimaryColumn()
  student: number;

  @Column()
  assignment_id: number;

  @Column({
    type: 'timestamp',
  })
  stamp: string;

  @Column({
    type: 'bytea',
    transformer: bufferToStringTransformer,
  })
  content_sha: string;

  @Column({
    type: 'bytea',
    transformer: bufferToStringTransformer,
  })
  token: string;

  @Column()
  dirty: boolean;
}
