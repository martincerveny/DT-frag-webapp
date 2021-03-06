import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReviewRequestsDto } from './dto/reviewRequestsDto';
import { Review } from './entities/review.entity';
import { ReviewDto } from './dto/reviewDto';
import { Annotation } from './entities/annotation.entity';
import { AnnotationDto } from './dto/annotationDto';
import { ReviewRequest } from './entities/reviewRequest.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(ReviewRequest)
    private reviewRequestRepository: Repository<ReviewRequest>,
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    @InjectRepository(Annotation)
    private annotationRepository: Repository<Annotation>,
  ) {}

  /**
   * Returns review requests based on assignment ID
   */
  findReviewRequestsByAssignment(id: number): Promise<ReviewRequestsDto[]> {
    return this.reviewRequestRepository
      .createQueryBuilder('review_request')
      .select([
        'review_request.student as student',
        'review_request.assignment_id as assignment_id',
        'review_request.count as count',
        'person.name as name',
      ])
      .leftJoin('person', 'person', 'person.id = review_request.student')
      .where('review_request.assignment_id = :id', { id })
      .getRawMany();
  }

  /**
   * Returns reviews based on student ID and assignment ID
   */
  findReviews(studentId: number, assignmentId: number): Promise<ReviewDto[]> {
    return this.reviewRepository
      .createQueryBuilder('review')
      .select([
        'review.id as review_id',
        'review.author as review_author',
        'person.name as review_author_name',
        'review.submission_id as submission_id',
        'review.created as review_created',
        'review.updated as review_updated',
        'submission_latest.author as submission_author',
        'submission_latest.assignment_id as assignment_id',
      ])
      .leftJoin(
        'submission_latest',
        'submission_latest',
        'review.submission_id = submission_latest.id',
      )
      .leftJoin('person', 'person', 'person.id = review.author')
      .where('submission_latest.author = :studentId', { studentId })
      .andWhere('submission_latest.assignment_id = :assignmentId', {
        assignmentId,
      })
      .getRawMany();
  }

  /**
   * Returns annotations for reviews based on review ID's
   */
  findAnnotationsByReview(ids: string): Promise<AnnotationDto[]> {
    const idsArray = ids.split(',');
    return this.annotationRepository
      .createQueryBuilder('annotation')
      .select([
        'annotation.review_id as review_id',
        'annotation.name as name',
        'annotation.line as line',
        'annotation.note as note',
        'annotation.submission_id as submission_id',
        'encode("content_sha"::bytea, \'escape\') as content_sha',
        'encode("data"::bytea, \'escape\') as data',
      ])
      .leftJoin(
        'submission_in',
        'submission_in',
        'submission_in.submission_id = annotation.submission_id AND submission_in.name = annotation.name',
      )
      .leftJoin('content', 'content', 'content.sha = submission_in.content_sha')
      .where('annotation.review_id IN (:...ids)', { ids: idsArray })
      .getRawMany();
  }
}
