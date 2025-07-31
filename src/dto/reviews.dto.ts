import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({ example: 1, description: 'ID của người dùng' })
  @IsInt()
  user_id: number;

  @ApiProperty({ example: 1, description: 'ID của nhà hàng' })
  @IsInt()
  restaurant_id: number;

  @ApiProperty({ example: 5, description: 'Đánh giá của người dùng', minimum: 1, maximum: 5 })
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({ example: 'Great food and service!', description: 'Nhận xét của người dùng' })
  @IsOptional()
  @IsString()
  comment?: string;
}

export class UpdateReviewDto extends PartialType(CreateReviewDto) {}
