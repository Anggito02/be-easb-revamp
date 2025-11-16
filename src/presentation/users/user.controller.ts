import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  UseGuards,
  Res,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { UserService } from '../../domain/user/user.service';
import { Roles } from '../../common/decorators/roles.decorator';
import { CreateUserDto } from './dto/create_user.dto';
import { ResponseDto } from '../../common/dto/response.dto';
import { Role } from 'src/domain/user/user_role.enum';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Roles(Role.SUPERADMIN)
    @Post('create')
    async create(@Body() dto: CreateUserDto, @Res({ passthrough: true }) res: Response): Promise<ResponseDto> {
        try {
            const user = await this.userService.create(dto);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'User created',
                data: user,
            };
        } catch (error) {
            if (error instanceof HttpException) {
                const status = error.getStatus();
                const response = error.getResponse();

                // response bisa string atau object { message: string | string[]; ... }
                let message: string;

                if (typeof response === 'string') {
                    message = response;
                } else {
                    const resObj = response as any;
                if (Array.isArray(resObj.message)) {
                    message = resObj.message.join(', ');
                } else {
                    message = resObj.message ?? 'Error';
                }
                }

                return {
                    status: 'error',
                    responseCode: status,
                    message,
                    data: null,
                };
            }

            return {
                status: 'error',
                responseCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Internal server error',
                data: null,
            };
        }
    }

    @Roles(Role.ADMIN)
    @Post('/admin/create')
    async createUserByAdmin(@Body() dto: CreateUserDto, @Res({ passthrough: true }) res: Response): Promise<ResponseDto> {
        try {
            const user = await this.userService.createUserByAdmin(dto);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'User created',
                data: user,
            };
        } catch (error) {
            if (error instanceof HttpException) {
                const status = error.getStatus();
                const response = error.getResponse();

                // response bisa string atau object { message: string | string[]; ... }
                let message: string;

                if (typeof response === 'string') {
                    message = response;
                } else {
                    const resObj = response as any;
                if (Array.isArray(resObj.message)) {
                    message = resObj.message.join(', ');
                } else {
                    message = resObj.message ?? 'Error';
                }
                }

                return {
                    status: 'error',
                    responseCode: status,
                    message,
                    data: null,
                };
            }

            return {
                status: 'error',
                responseCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Internal server error',
                data: null,
            };
        }
    }
}
