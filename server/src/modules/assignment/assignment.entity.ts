import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Assignment {
  @PrimaryColumn()
  id: number;

  @Column({
    type: 'text',
  })
  name: string;
}
