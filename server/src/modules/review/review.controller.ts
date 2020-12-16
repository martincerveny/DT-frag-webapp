import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ReviewService } from './review.service';
import { AuthGuard } from '../shared/guards/auth.guard';
import { ActiveRequests } from './entities/activeRequests.entity';
import { ReviewDto } from './dto/reviewDto';
import { AnnotationDto } from './dto/annotationDto';

@UseGuards(AuthGuard)
@Controller('api/reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get('/requests/:id/assignment')
  findActiveRequestsByAssignment(@Param('id') id): Promise<ActiveRequests[]> {
    return this.reviewService.findActiveRequestsByAssignment(id);
  }

  @Get('/student/:studentId/assignment/:assignmentId')
  findReviews(
    @Param('studentId') studentId,
    @Param('assignmentId') assignmentId,
  ): Promise<ReviewDto[]> {
    return this.reviewService.findReviews(studentId, assignmentId);
  }

  @Get('/annotations')
  findAnnotationsByReview(@Query() query): Promise<AnnotationDto[]> {
    return this.reviewService.findAnnotationsByReview(query.reviews);
  }
}
