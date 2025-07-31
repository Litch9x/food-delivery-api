import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule], // PrismaModule cần thiết để sử dụng PrismaService
  providers: [AuthService, UsersService, JwtService],
  controllers: [AuthController]
})
export class AuthModule { }
