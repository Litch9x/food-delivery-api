import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { AddressesController } from './addresses.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule], // ✅ bắt buộc phải có
  providers: [AddressesService],
  controllers: [AddressesController]
})
export class AddressesModule {}
