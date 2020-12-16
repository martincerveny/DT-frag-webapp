import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { ActiveRequests } from './entities/activeRequests.entity';
import { Review } from './entities/review.entity';
import { Annotation } from './entities/annotation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ActiveRequests, Review, Annotation]),
    AuthModule,
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
