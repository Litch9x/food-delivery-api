import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule], // ✅ bắt buộc phải có
  providers: [OrdersService],
  controllers: [OrdersController]
})
export class OrdersModule {}
