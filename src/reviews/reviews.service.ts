import { Injectable } from '@nestjs/common';
import { CreateReviewDto, UpdateReviewDto } from '../dto/reviews.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateReviewDto) {
    return this.prisma.review.create({
      data: {
        rating: dto.rating,
        comment: dto.comment ?? '',
        user: {
          connect: {
            id: dto.user_id,
          },
        },
        restaurant: {
          connect: {
            id: dto.restaurant_id,
          },
        },
        createdAt: new Date(),
      },
    });
  }

  findAll() {
    return this.prisma.review.findMany({
      include: {
        user: true,
        restaurant: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.review.findUnique({
      where: { id },
      include: {
        user: true,
        restaurant: true,
      },
    });
  }

  update(id: number, dto: UpdateReviewDto) {
    return this.prisma.review.update({
      where: { id },
      data: {
        rating: dto.rating,
        comment: dto.comment,
        // Nếu muốn cho update userId hoặc restaurantId thì thêm logic ở đây
      },
    });
  }

  remove(id: number) {
    return this.prisma.review.delete({ where: { id } });
  }
}
