import {
  Controller, Get, Post, Delete, Body, Param, ParseIntPipe, UseGuards, Req
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartItemDto } from '../dto/create-cart-item.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('cart')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiOperation({ summary: 'Get user cart' })
  @ApiResponse({ status: 200, description: 'Cart retrieved successfully.' })
  @Get()
  getCart(@Req() req) {
    return this.cartService.getCart(req.user.userId);
  }

  @ApiOperation({ summary: 'Add item to cart' })
  @ApiResponse({ status: 201, description: 'Item added to cart successfully.' })
  @Post('add')
  addItem(@Req() req, @Body() dto: CreateCartItemDto) {
    return this.cartService.addItem(req.user.userId, dto);
  }

  @ApiOperation({ summary: 'Remove item from cart' })
  @ApiResponse({ status: 200, description: 'Item removed from cart successfully.' })
  @Delete('remove/:foodId')
  removeItem(@Req() req, @Param('foodId', ParseIntPipe) foodId: number) {
    return this.cartService.removeItem(req.user.userId, foodId);
  }

  @ApiOperation({ summary: 'Clear cart' })
  @ApiResponse({ status: 200, description: 'Cart cleared successfully.' })
  @Delete('clear')
  clearCart(@Req() req) {
    return this.cartService.clearCart(req.user.userId);
  }
}
