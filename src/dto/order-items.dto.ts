import { IsDecimal, IsInt } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderItemDto {
  @ApiProperty({ example: 1, description: 'ID của đơn hàng' })
  @IsInt()
  orderId: number;

  @ApiProperty({ example: 1, description: 'ID của món ăn' })
  @IsInt()
  foodId: number;

  @ApiProperty({ example: 2, description: 'Số lượng món ăn' })
  @IsInt()
  quantity: number;

  @ApiProperty({ example: 9.99, description: 'Giá món ăn' })
  @IsDecimal()
  price: number;

}

export class UpdateOrderItemDto extends PartialType(CreateOrderItemDto) { }
