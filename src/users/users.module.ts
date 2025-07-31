import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [PrismaModule], // ✅ bắt buộc phải có
  providers: [UsersService,],
  controllers: [UsersController],
  exports: [UsersService], // ✅ nếu cần sử dụng UsersService ở module khác
})
export class UsersModule { }
