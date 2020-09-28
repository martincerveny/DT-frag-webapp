import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Seminar {
  @PrimaryColumn()
  id: number;

  @Column({
    type: 'text',
  })
  name: string;
}
