import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../../application/user/user.service';
import { JwtAuthGuard } from '../../common/guards/jwt_auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CreateUserDto } from './dto/create_user.dto';
  import { ResponseDto } from '../../common/dto/response.dto';
import * as bcrypt from 'bcryptjs';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  /** Membuat user baru. Hanya peran 'admin' yang boleh. */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  async create(@Body() dto: CreateUserDto): Promise<ResponseDto> {
    // Hash password sebelum menyimpan
    const hash = bcrypt.hashSync(dto.password, 10);
    const user = await this.userService.create({
      id: null,
      username: dto.username,
      passwordHash: hash,
      roles: dto.roles,
    });
    return {
      status: 'success',
      message: 'User created',
      data: user,
    };
  }

  /** Mengambil user berdasarkan username. */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get(':username')
  async getByUsername(
    @Param('username') username: string,
  ): Promise<ResponseDto> {
    const user = await this.userService.findByUsername(username);
    return {
      status: 'success',
      message: 'User fetched',
      data: user,
    };
  }
}
