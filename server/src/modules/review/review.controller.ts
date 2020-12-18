import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ReviewService } from './review.service';
import { AuthGuard } from '../shared/guards/auth.guard';
import { ReviewDto } from './dto/reviewDto';
import { AnnotationDto } from './dto/annotationDto';
import { ReviewRequestsDto } from './dto/reviewRequestsDto';

@UseGuards(AuthGuard)
@Controller('api/reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get('/requests/:id/assignment')
  findReviewRequestsByAssignment(
    @Param('id') id,
  ): Promise<ReviewRequestsDto[]> {
    return this.reviewService.findReviewRequestsByAssignment(id);
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
