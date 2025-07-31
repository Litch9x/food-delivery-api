import {
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Body,
  UploadedFile,
  UseInterceptors,
  ParseIntPipe,
} from '@nestjs/common';
import {CreateRestaurantDto} from '../dto/restaurants.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { RestaurantsService } from './restaurants.service';

@ApiTags('restaurants')
@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/restaurants',
        filename: (req, file, cb) => {
          const ext = extname(file.originalname);
          const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
          cb(null, filename);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateRestaurantDto })
  @ApiOperation({ summary: 'Tạo nhà hàng mới' })
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateRestaurantDto,
  ) {
    const imagePath = file ? `/uploads/restaurants/${file.filename}` : null;
    return this.restaurantsService.create({ ...dto, image: imagePath });
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả nhà hàng' })
  findAll() {
    return this.restaurantsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết nhà hàng theo ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.restaurantsService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xoá nhà hàng theo ID' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.restaurantsService.remove(id);
  }
}
