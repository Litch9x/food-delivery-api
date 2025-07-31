import { Injectable } from "@nestjs/common";
import { CreateOrderItemDto, UpdateOrderItemDto } from "../dto/order-items.dto";
import { PrismaService } from "../prisma/prisma.service";
@Injectable()
export class OrderItemsService {
  constructor(private prisma: PrismaService) {}

create(dto: CreateOrderItemDto) {
  return this.prisma.orderItem.create({
    data: {
      quantity: dto.quantity,      
      order: { connect: { id: dto.orderId } },
      price: dto.price,
      food: { connect: { id: dto.foodId } }
    }
  });
}


  findAll() {
    return this.prisma.orderItem.findMany();
  }

  findOne(id: number) {
    return this.prisma.orderItem.findUnique({ where: { id } });
  }

  update(id: number, dto: UpdateOrderItemDto) {
    return this.prisma.orderItem.update({ where: { id }, data: dto });
  }

  remove(id: number) {
    return this.prisma.orderItem.delete({ where: { id } });
  }
}