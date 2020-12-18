import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Review } from './entities/review.entity';
import { Annotation } from './entities/annotation.entity';
import { ReviewRequest } from './entities/reviewRequest.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Review, Annotation, ReviewRequest]),
    AuthModule,
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
