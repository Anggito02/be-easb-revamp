import {
    Controller,
    Post,
    Get,
    Put,
    Delete,
    Body,
    Param,
    ParseIntPipe,
    Query,
    HttpStatus,
    HttpException,
} from '@nestjs/common';
import { RoomService } from '../../domain/room/room.service';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../domain/user/user_role.enum';
import { ResponseDto } from '../../common/dto/response.dto';
import { CreateRoomDto } from './dto/create_room.dto';
import { UpdateRoomDto } from './dto/update_room.dto';
import { GetRoomsDto } from './dto/get_rooms.dto';
import { ActivateRoomDto } from './dto/activate_room.dto';
import { AddTahunAnggaranDto } from './dto/add_tahun_anggaran.dto';
import { AssignKabkotaDto } from './dto/assign_kabkota.dto';

@Controller('rooms')
@Roles(Role.SUPERADMIN)
export class RoomController {
    constructor(private readonly roomService: RoomService) {}

    @Post()
    async create(@Body() dto: CreateRoomDto): Promise<ResponseDto> {
        try {
            const room = await this.roomService.create(dto);
            return {
                status: 'success',
                responseCode: HttpStatus.CREATED,
                message: 'Room created',
                data: room,
            };
        } catch (error) {
            return this.handleError(error);
        }
    }

    @Get()
    async findAll(@Query() dto: GetRoomsDto): Promise<ResponseDto> {
        try {
            const result = await this.roomService.findAll(dto);
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Rooms retrieved',
                data: result,
            };
        } catch (error) {
            return this.handleError(error);
        }
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number): Promise<ResponseDto> {
        try {
            const room = await this.roomService.findById(id);
            if (!room) {
                return { status: 'error', responseCode: 404, message: `Room with id ${id} not found`, data: null };
            }
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Room retrieved',
                data: room,
            };
        } catch (error) {
            return this.handleError(error);
        }
    }

    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateRoomDto,
    ): Promise<ResponseDto> {
        try {
            const room = await this.roomService.update(id, dto);
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Room updated',
                data: room,
            };
        } catch (error) {
            return this.handleError(error);
        }
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number): Promise<ResponseDto> {
        try {
            const deleted = await this.roomService.delete(id);
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Room deleted',
                data: deleted,
            };
        } catch (error) {
            return this.handleError(error);
        }
    }

    @Post(':id/activate')
    async activate(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: ActivateRoomDto,
    ): Promise<ResponseDto> {
        try {
            const room = await this.roomService.activate(id, dto.is_active);
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: `Room ${dto.is_active ? 'activated' : 'deactivated'}`,
                data: room,
            };
        } catch (error) {
            return this.handleError(error);
        }
    }

    @Get(':id/tahun-anggaran')
    async getTahunAnggarans(@Param('id', ParseIntPipe) id: number): Promise<ResponseDto> {
        try {
            const tahunAnggarans = await this.roomService.getTahunAnggarans(id);
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Tahun anggarans retrieved',
                data: tahunAnggarans,
            };
        } catch (error) {
            return this.handleError(error);
        }
    }

    @Post(':id/tahun-anggaran')
    async addTahunAnggaran(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: AddTahunAnggaranDto,
    ): Promise<ResponseDto> {
        try {
            const tahunAnggaran = await this.roomService.addTahunAnggaran(id, dto.tahun);
            return {
                status: 'success',
                responseCode: HttpStatus.CREATED,
                message: 'Tahun anggaran added',
                data: tahunAnggaran,
            };
        } catch (error) {
            return this.handleError(error);
        }
    }

    @Delete(':id/tahun-anggaran/:tahun')
    async removeTahunAnggaran(
        @Param('id', ParseIntPipe) id: number,
        @Param('tahun', ParseIntPipe) tahun: number,
    ): Promise<ResponseDto> {
        try {
            const deleted = await this.roomService.removeTahunAnggaran(id, tahun);
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Tahun anggaran removed',
                data: deleted,
            };
        } catch (error) {
            return this.handleError(error);
        }
    }

    @Put(':id/kabkota')
    async assignKabkota(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: AssignKabkotaDto,
    ): Promise<ResponseDto> {
        try {
            const room = await this.roomService.assignKabkota(id, dto.kabkota_id);
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'KabKota assigned',
                data: room,
            };
        } catch (error) {
            return this.handleError(error);
        }
    }

    private handleError(error: unknown): ResponseDto {
        if (error instanceof HttpException) {
            const status = error.getStatus();
            const response = error.getResponse();

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
