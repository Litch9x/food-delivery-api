import { Injectable } from "@nestjs/common";
import { CreateFoodDto, UpdateFoodDto } from "../dto/foods.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class FoodsService {
  constructor(private prisma: PrismaService) { }

  create(dto: CreateFoodDto & { image?: string }) {
    return this.prisma.food.create({
      data: {
        name: dto.name,
        price: dto.price,
        description: dto.description,
        image: dto.image,
        restaurant: {
          connect: { id: dto.restaurant_id },
        },
      },
    });
  }

  findAll() {
    return this.prisma.food.findMany();
  }

  findOne(id: number) {
    return this.prisma.food.findUnique({ where: { id } });
  }

  update(id: number, dto: UpdateFoodDto) {
    return this.prisma.food.update({ where: { id }, data: dto });
  }

  remove(id: number) {
    return this.prisma.food.delete({ where: { id } });
  }
}
