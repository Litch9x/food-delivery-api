import { Controller, Post, Body, Get, Param, Patch, Delete, ParseIntPipe, UseGuards } from "@nestjs/common";
import { AddressesService } from "./addresses.service";
import { CreateAddressDto, UpdateAddressDto } from "../dto/addresses.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@ApiTags('addresses')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('addresses')
export class AddressesController {
  constructor(private readonly service: AddressesService) { }

  @ApiOperation({ summary: 'Create a new address' })
  @ApiResponse({ status: 201, description: 'Address created successfully.' })
  @Post()
  create(@Body() dto: CreateAddressDto) {
    return this.service.create(dto);
  }

  @ApiOperation({ summary: 'Get all addresses' })
  @ApiResponse({ status: 200, description: 'List of addresses.' })
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @ApiOperation({ summary: 'Get an address by ID' })
  @ApiResponse({ status: 200, description: 'Address found.' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @ApiOperation({ summary: 'Update an address by ID' })
  @ApiResponse({ status: 200, description: 'Address updated successfully.' })
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateAddressDto) {
    return this.service.update(id, dto);
  }

  @ApiOperation({ summary: 'Delete an address by ID' })
  @ApiResponse({ status: 200, description: 'Address deleted successfully.' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
