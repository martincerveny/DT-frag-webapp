import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ synchronize: false })
export class Annotation {
  @PrimaryColumn()
  review_id: number;

  @Column({
    type: 'text',
  })
  name: string;

  @Column()
  line: number;

  @PrimaryColumn({
    type: 'text',
  })
  note: string;

  @Column()
  submission_id: number;
}
