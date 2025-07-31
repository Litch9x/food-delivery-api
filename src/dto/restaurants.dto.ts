import { IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRestaurantDto {
  @ApiProperty({ example: 'Pizza Place', description: 'Tên nhà hàng' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'A cozy place for delicious pizzas', description: 'Mô tả nhà hàng' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @IsOptional()
  image?: any;

  @ApiProperty({ example: '123 Main St', description: 'Địa chỉ nhà hàng' })
  @IsString()
  address: string;

  @ApiProperty({ example: 'Hanoi', description: 'Thành phố nhà hàng' })
  @IsString()
  phone: string;
}

export class UpdateRestaurantDto extends PartialType(CreateRestaurantDto) { }
