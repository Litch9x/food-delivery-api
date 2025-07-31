import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule], // ✅ bắt buộc phải có
  providers: [CartService],
  controllers: [CartController]
})
export class CartModule {}
