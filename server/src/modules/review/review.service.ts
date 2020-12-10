import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActiveRequests } from './entities/activeRequests.entity';
import { ActiveRequestsDto } from './dto/activeRequestsDto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(ActiveRequests)
    private activeRequestsRepository: Repository<ActiveRequests>,
  ) {}

  findActiveRequestsByAssignment(id: number): Promise<ActiveRequestsDto[]> {
    return this.activeRequestsRepository
      .createQueryBuilder('active_requests')
      .select([
        'active_requests.student as student',
        'active_requests.assignment_id as assignment_id',
        'active_requests.count as count',
        'person.name as name',
      ])
      .leftJoin('person', 'person', 'person.id = active_requests.student')
      .where('active_requests.assignment_id = :id', { id })
      .getRawMany();
  }
}
