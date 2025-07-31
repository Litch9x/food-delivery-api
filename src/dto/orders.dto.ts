import { IsDecimal, IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
export class CreateOrderDto {
    @ApiProperty({ example: 1, description: 'ID của người dùng' })
    @IsInt()
    user_id: number;

    @ApiProperty({ example: '123 Main St', description: 'Địa chỉ giao hàng' })
    @IsInt()
    delivery_address_id: number;

    @ApiProperty({ example: 'PENDING', enum: $Enums.OrderStatus, description: 'Trạng thái đơn hàng' })
    @IsEnum($Enums.OrderStatus)
    status: $Enums.OrderStatus;

    @ApiProperty({ example: 'CREDIT_CARD', enum: $Enums.PaymentMethod, description: 'Phương thức thanh toán' })
    @IsDecimal()
    total_price: number;
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) { }
