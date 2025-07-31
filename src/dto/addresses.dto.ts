import { IsInt, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAddressDto {
  @ApiProperty({ example: 1, description: 'ID của người dùng' })
  @IsInt()
  user_id: number;

  @ApiProperty({ example: '123 Main St', description: 'Địa chỉ đường phố' })
  @IsString()
  street: string;

  @ApiProperty({ example: 'Hanoi', description: 'Thành phố' })
  @IsString()
  city: string;

  @ApiProperty({ example: 'Hanoi', description: 'Tỉnh/Thành phố' })
  @IsString()
  province: string;

  @ApiProperty({ example: '12345', description: 'Mã bưu điện' })
  @IsString()
  postal_code: string;

}

export class UpdateAddressDto extends PartialType(CreateAddressDto) { }
