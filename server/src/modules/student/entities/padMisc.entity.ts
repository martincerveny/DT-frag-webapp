import { Entity, Column, PrimaryColumn } from 'typeorm';
import { bufferToStringTransformer } from '../../../code/helpers/transformers';

@Entity()
export class PadMisc {
  @Column({
    type: 'text',
  })
  name: string;

  @PrimaryColumn()
  student: number;

  @Column({
    type: 'timestamp',
  })
  stamp: string;

  @Column({
    type: 'bytea',
    transformer: bufferToStringTransformer,
  })
  content_sha: string;

  @Column()
  dirty: boolean;
}
