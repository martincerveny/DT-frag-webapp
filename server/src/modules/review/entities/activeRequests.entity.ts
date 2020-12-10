import { Column, ViewEntity } from 'typeorm';

@ViewEntity({ name: 'active_requests', synchronize: false })
export class ActiveRequests {
  @Column()
  student: number;

  @Column()
  assignment_id: number;

  @Column()
  count: number;
}
