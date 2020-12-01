import { Entity, Column, PrimaryColumn } from 'typeorm';
import { bufferToStringTransformer } from '../../../code/helpers/transformers';

@Entity()
export class Person {
  @PrimaryColumn()
  id: number;

  @Column({
    type: 'bytea',
    transformer: bufferToStringTransformer,
  })
  login: string;

  @Column({
    type: 'text',
  })
  name: string;
}
