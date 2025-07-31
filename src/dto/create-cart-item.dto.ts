import { IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCartItemDto {
  @ApiProperty({ example: 1, description: 'ID của món ăn' })
  @IsInt()
  foodId: number;

  @ApiProperty({ example: 2, description: 'Số lượng món ăn' })
  @IsInt()
  @Min(1)
  quantity: number;
}
