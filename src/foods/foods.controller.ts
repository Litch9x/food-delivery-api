import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FoodsService } from './foods.service';
import { CreateFoodDto, UpdateFoodDto } from '../dto/foods.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth,ApiConsumes,ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@ApiTags('foods')
@UseGuards(RolesGuard)
@Roles('ADMIN')
@Controller('foods')
export class FoodsController {
  constructor(private readonly foodsService: FoodsService) { }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const ext = extname(file.originalname);
          const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
          cb(null, filename);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateFoodDto })
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateFoodDto,
  ) {
    const imagePath = file ? `/uploads/${file.filename}` : undefined;
    return this.foodsService.create({ ...dto, image: imagePath });
  }

  @ApiOperation({ summary: 'Get all food items' })
  @ApiResponse({ status: 200, description: 'List of food items.' })
  @Get()
  findAll() {
    return this.foodsService.findAll();
  }

  @ApiOperation({ summary: 'Get a food item by ID' })
  @ApiResponse({ status: 200, description: 'Food item found.' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.foodsService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a food item by ID' })
  @ApiResponse({ status: 200, description: 'Food item updated successfully.' })
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateFoodDto) {
    return this.foodsService.update(id, dto);
  }

  @ApiOperation({ summary: 'Delete a food item by ID' })
  @ApiResponse({ status: 200, description: 'Food item deleted successfully.' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.foodsService.remove(id);
  }
}