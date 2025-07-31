import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { OrderItemsService } from './order-items.service';
import { CreateOrderItemDto, UpdateOrderItemDto } from '../dto/order-items.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('order-items')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('order-items')
export class OrderItemsController {
  constructor(private readonly service: OrderItemsService) {}

  @ApiOperation({ summary: 'Create a new order item' })
  @ApiResponse({ status: 201, description: 'Order item created successfully.' })
  @Post()
  create(@Body() dto: CreateOrderItemDto) {
    return this.service.create(dto);
  }

  @ApiOperation({ summary: 'Get all order items' })
  @ApiResponse({ status: 200, description: 'List of order items.' })
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @ApiOperation({ summary: 'Get an order item by ID' })
  @ApiResponse({ status: 200, description: 'Order item found.' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @ApiOperation({ summary: 'Update an order item by ID' })
  @ApiResponse({ status: 200, description: 'Order item updated successfully.' })
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateOrderItemDto) {
    return this.service.update(id, dto);
  }
  
  @ApiOperation({ summary: 'Delete an order item by ID' })
  @ApiResponse({ status: 200, description: 'Order item deleted successfully.' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}