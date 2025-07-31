import { Module } from '@nestjs/common';
import { FoodsService } from './foods.service';
import { FoodsController } from './foods.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule], // ✅ bắt buộc phải có
  providers: [FoodsService],
  controllers: [FoodsController]
})
export class FoodsModule {}
