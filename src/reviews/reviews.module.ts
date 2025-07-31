import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule], // ✅ bắt buộc phải có
  providers: [ReviewsService],
  controllers: [ReviewsController]
})
export class ReviewsModule {}
