import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { $Enums, UserRole } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'john_doe', description: 'Tên người dùng' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'john@example.com', description: 'Email người dùng' })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'strongPassword123',
    description: 'Mật khẩu người dùng',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: 'USER',
    enum: UserRole,
    description: 'Vai trò người dùng (USER hoặc ADMIN)',
    required: false,
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @ApiProperty({
    example: 'https://example.com/avatar.jpg',
    description: 'Ảnh đại diện của người dùng',
    required: false,
  })
  @IsOptional()
  @IsString()
  avatar?: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) { }
