import { Injectable } from "@nestjs/common";
import { CreateRestaurantDto, UpdateRestaurantDto } from "../dto/restaurants.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class RestaurantsService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateRestaurantDto) {
    return this.prisma.restaurant.create({
      data: {
        name: dto.name,
        description: dto.description ?? "",
        image: dto.image,
        address: dto.address,
        phone: dto.phone,
        createdAt: new Date(),
      },
    });
  }

  findAll() {
    return this.prisma.restaurant.findMany();
  }

  findOne(id: number) {
    return this.prisma.restaurant.findUnique({ where: { id } });
  }

  update(id: number, dto: UpdateRestaurantDto) {
    return this.prisma.restaurant.update({
      where: { id },
      data: {
        name: dto.name,
        description: dto.description,
        image: dto.image,
        address: dto.address,
        phone: dto.phone,
        // không nên update created_at
      },
    });
  }

  remove(id: number) {
    return this.prisma.restaurant.delete({ where: { id } });
  }
}
