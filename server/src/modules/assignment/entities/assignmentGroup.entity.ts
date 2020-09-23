import { Column, PrimaryColumn, ValueTransformer, ViewEntity } from 'typeorm';

export const bufferToStringTransformer: ValueTransformer = {
  from: value => value.toString(),
  to: value => value,
};

@ViewEntity({ name: 'eval_groups', synchronize: false })
export class AssignmentGroup {
  @PrimaryColumn()
  assignment_id: number;

  @Column({
    type: 'bytea',
    transformer: bufferToStringTransformer,
  })
  group: string;
}
