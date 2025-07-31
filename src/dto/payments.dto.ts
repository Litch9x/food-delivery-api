import { IsDecimal, IsEnum, IsInt, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { $Enums, PaymentMethod, PaymentStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty({ example: 1, description: 'ID của đơn hàng' })
  @IsInt()
  order_id: number;

  @ApiProperty({ example: 'CREDIT_CARD', enum: PaymentMethod })
  @IsEnum($Enums.PaymentMethod)
  method: $Enums.PaymentMethod;

   @ApiProperty({ example: 200000, description: 'Số tiền thanh toán' })
  @IsDecimal()
  amount: number;

   @ApiProperty({ example: 'PENDING', enum: PaymentStatus })
  @IsEnum($Enums.PaymentStatus)
  status: $Enums.PaymentStatus;
}

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) { }
