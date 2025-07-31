import { Injectable } from "@nestjs/common";
import { CreatePaymentDto, UpdatePaymentDto } from "../dto/payments.dto";
import { PrismaService } from "../prisma/prisma.service";
@Injectable()
export class PaymentsService {
    constructor(private prisma: PrismaService) { }

    create(dto: CreatePaymentDto) {
        return this.prisma.payment.create({
            data: {
                amount: dto.amount,
                method: dto.method,
                status: dto.status,   // ✅ bắt buộc
                order: {
                    connect: { id: dto.order_id },
                },
            },
        });

    }

    findAll() {
        return this.prisma.payment.findMany();
    }

    findOne(id: number) {
        return this.prisma.payment.findUnique({ where: { id } });
    }

    update(id: number, dto: UpdatePaymentDto) {
        return this.prisma.payment.update({ where: { id }, data: dto });
    }

    remove(id: number) {
        return this.prisma.payment.delete({ where: { id } });
    }
}