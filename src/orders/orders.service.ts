import { Injectable } from '@nestjs/common';
import { CreateOrderDto, UpdateOrderDto } from '../dto/orders.dto';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class OrdersService {
    constructor(private prisma: PrismaService) { }

    create(dto: CreateOrderDto) {
        return this.prisma.order.create({
            data: {
                totalPrice: dto.total_price,
                status: dto.status ?? 'PENDING', // <-- ✅ thêm dòng này
                deliveryAddress: {
                    connect: {
                        id: dto.delivery_address_id,
                    },
                },
                user: {
                    connect: {
                        id: dto.user_id,
                    },
                },
            },
        });

    }

    findAll() {
        return this.prisma.order.findMany();
    }

    findOne(id: number) {
        return this.prisma.order.findUnique({ where: { id } });
    }

    update(id: number, dto: UpdateOrderDto) {
        return this.prisma.order.update({ where: { id }, data: dto });
    }

    remove(id: number) {
        return this.prisma.order.delete({ where: { id } });
    }
}
