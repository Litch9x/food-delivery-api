import { IsDecimal, IsInt, IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFoodDto {
    @ApiProperty({ example: 'Pizza', description: 'Tên món ăn' })
    @IsString()
    name: string;

    @ApiProperty({ example: 'Delicious cheese pizza', description: 'Mô tả món ăn' })
    @IsOptional()
    @IsString()
    description: string;

    @ApiProperty({ example: 9.99, description: 'Giá món ăn' })
    @IsDecimal()
    price: number;

    @ApiProperty({ type: 'string', format: 'binary', required: false })
    @IsOptional()
    image?: any;

    @ApiProperty({ example: 1, description: 'ID của nhà hàng' })
    @IsInt()
    restaurant_id: number;
}

export class UpdateFoodDto extends PartialType(CreateFoodDto) { }
