import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'johndoe',
    description: 'Tên đăng nhập của người dùng',
  })
  @IsString()
  username: string;

  @ApiProperty({
    example: 'strongPassword123',
    description: 'Mật khẩu người dùng',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  password: string;
}
