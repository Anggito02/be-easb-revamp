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
    Req,
    Patch,
    ForbiddenException,
} from '@nestjs/common';
import { RoomService } from '../../domain/room/room.service';
import { RoomDinasService } from '../../application/room/room_dinas.service';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../domain/user/user_role.enum';
import { ResponseDto } from '../../common/dto/response.dto';
import { CreateRoomDto } from './dto/create_room.dto';
import { UpdateRoomDto } from './dto/update_room.dto';
import { GetRoomsDto } from './dto/get_rooms.dto';
import { ActivateRoomDto } from './dto/activate_room.dto';
import { AddTahunAnggaranDto } from './dto/add_tahun_anggaran.dto';
import { AssignKabkotaDto } from './dto/assign_kabkota.dto';
import { CreateDinasDto } from './dto/create_dinas.dto';
import { BulkDinasDto } from './dto/bulk_dinas.dto';
import { CreateAdminAccountDto } from './dto/create_admin_account.dto';
import { AssignDinasUserDto } from './dto/assign_dinas_user.dto';
import type { Request } from 'express';
import { UserContext } from '../../common/types/user-context.type';

@Controller('rooms')
export class RoomController {
    constructor(
        private readonly roomService: RoomService,
        private readonly roomDinasService: RoomDinasService,
    ) {}

    private assertAdminRoom(user: UserContext, roomId: number): void {
        if (user.roles.includes(Role.SUPERADMIN)) return;
        if (user.roles.includes(Role.ADMIN)) {
            if (user.roomId == null || user.roomId !== roomId) {
                throw new ForbiddenException('You can only manage your assigned room');
            }
            return;
        }
        throw new ForbiddenException('Insufficient permissions');
    }

    private restrictRoomsList(user: UserContext): number | null | undefined {
        if (user.roles.includes(Role.SUPERADMIN)) return undefined;
        if (user.roles.includes(Role.ADMIN)) {
            if (user.roomId == null) throw new ForbiddenException('Admin is not assigned to a room');
            return user.roomId;
        }
        throw new ForbiddenException('Insufficient permissions');
    }

    @Post()
    @Roles(Role.SUPERADMIN)
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
    @Roles(Role.SUPERADMIN, Role.ADMIN)
    async findAll(@Query() dto: GetRoomsDto, @Req() req: Request): Promise<ResponseDto> {
        try {
            const user = req.user as UserContext;
            const restrictToRoomId = this.restrictRoomsList(user);
            const result = await this.roomService.findAll(dto, restrictToRoomId);
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
    @Roles(Role.SUPERADMIN, Role.ADMIN)
    async findById(@Param('id', ParseIntPipe) id: number, @Req() req: Request): Promise<ResponseDto> {
        try {
            this.assertAdminRoom(req.user as UserContext, id);
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
    @Roles(Role.SUPERADMIN, Role.ADMIN)
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateRoomDto,
        @Req() req: Request,
    ): Promise<ResponseDto> {
        try {
            this.assertAdminRoom(req.user as UserContext, id);
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
    @Roles(Role.SUPERADMIN)
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
    @Roles(Role.SUPERADMIN)
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
    @Roles(Role.SUPERADMIN, Role.ADMIN)
    async getTahunAnggarans(
        @Param('id', ParseIntPipe) id: number,
        @Req() req: Request,
    ): Promise<ResponseDto> {
        try {
            this.assertAdminRoom(req.user as UserContext, id);
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
    @Roles(Role.SUPERADMIN, Role.ADMIN)
    async addTahunAnggaran(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: AddTahunAnggaranDto,
        @Req() req: Request,
    ): Promise<ResponseDto> {
        try {
            this.assertAdminRoom(req.user as UserContext, id);
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
    @Roles(Role.SUPERADMIN, Role.ADMIN)
    async removeTahunAnggaran(
        @Param('id', ParseIntPipe) id: number,
        @Param('tahun', ParseIntPipe) tahun: number,
        @Req() req: Request,
    ): Promise<ResponseDto> {
        try {
            this.assertAdminRoom(req.user as UserContext, id);
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
    @Roles(Role.SUPERADMIN, Role.ADMIN)
    async assignKabkota(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: AssignKabkotaDto,
        @Req() req: Request,
    ): Promise<ResponseDto> {
        try {
            this.assertAdminRoom(req.user as UserContext, id);
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

    // --- Dinas OPD endpoints ---

    @Get(':id/opd-assignable-users')
    @Roles(Role.SUPERADMIN, Role.ADMIN)
    async listOpdAssignableUsers(
        @Param('id', ParseIntPipe) id: number,
        @Req() req: Request,
    ): Promise<ResponseDto> {
        try {
            this.assertAdminRoom(req.user as UserContext, id);
            const users = await this.roomDinasService.listAssignableOpdUsers(id);
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Assignable OPD users retrieved',
                data: users,
            };
        } catch (error) {
            return this.handleError(error);
        }
    }

    @Get(':id/dinas')
    @Roles(Role.SUPERADMIN, Role.ADMIN)
    async listDinas(
        @Param('id', ParseIntPipe) id: number,
        @Req() req: Request,
    ): Promise<ResponseDto> {
        try {
            this.assertAdminRoom(req.user as UserContext, id);
            const dinas = await this.roomDinasService.listDinas(id);
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Dinas retrieved',
                data: dinas,
            };
        } catch (error) {
            return this.handleError(error);
        }
    }

    @Post(':id/dinas')
    @Roles(Role.SUPERADMIN, Role.ADMIN)
    async createDinas(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: CreateDinasDto,
        @Req() req: Request,
    ): Promise<ResponseDto> {
        try {
            this.assertAdminRoom(req.user as UserContext, id);
            const dinas = await this.roomDinasService.createDinas(id, dto);
            return {
                status: 'success',
                responseCode: HttpStatus.CREATED,
                message: 'Dinas created',
                data: dinas,
            };
        } catch (error) {
            return this.handleError(error);
        }
    }

    @Post(':id/dinas/bulk')
    @Roles(Role.SUPERADMIN, Role.ADMIN)
    async bulkCreateDinas(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: BulkDinasDto,
        @Req() req: Request,
    ): Promise<ResponseDto> {
        try {
            this.assertAdminRoom(req.user as UserContext, id);
            const result = await this.roomDinasService.bulkCreateDinas(id, dto);
            return {
                status: 'success',
                responseCode: HttpStatus.CREATED,
                message: `Bulk dinas creation completed: ${result.created} created`,
                data: result,
            };
        } catch (error) {
            return this.handleError(error);
        }
    }

    @Patch(':id/dinas/:opdId/assign-user')
    @Roles(Role.SUPERADMIN, Role.ADMIN)
    async assignDinasUser(
        @Param('id', ParseIntPipe) id: number,
        @Param('opdId', ParseIntPipe) opdId: number,
        @Body() dto: AssignDinasUserDto,
        @Req() req: Request,
    ): Promise<ResponseDto> {
        try {
            this.assertAdminRoom(req.user as UserContext, id);
            const dinas = await this.roomDinasService.assignDinasUser(id, opdId, dto.user_id);
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'OPD user assigned to dinas',
                data: dinas,
            };
        } catch (error) {
            return this.handleError(error);
        }
    }

    @Delete(':id/dinas/:opdId')
    @Roles(Role.SUPERADMIN, Role.ADMIN)
    async deleteDinas(
        @Param('id', ParseIntPipe) id: number,
        @Param('opdId', ParseIntPipe) opdId: number,
        @Req() req: Request,
    ): Promise<ResponseDto> {
        try {
            this.assertAdminRoom(req.user as UserContext, id);
            const deleted = await this.roomDinasService.deleteDinas(id, opdId);
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Dinas deleted',
                data: deleted,
            };
        } catch (error) {
            return this.handleError(error);
        }
    }

    // --- Admin account endpoints ---

    @Get(':id/admins')
    @Roles(Role.SUPERADMIN, Role.ADMIN)
    async listAdmins(
        @Param('id', ParseIntPipe) id: number,
        @Req() req: Request,
    ): Promise<ResponseDto> {
        try {
            this.assertAdminRoom(req.user as UserContext, id);
            const admins = await this.roomDinasService.listAdmins(id);
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Admins retrieved',
                data: admins,
            };
        } catch (error) {
            return this.handleError(error);
        }
    }

    @Post(':id/admins')
    @Roles(Role.SUPERADMIN, Role.ADMIN)
    async createAdmin(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: CreateAdminAccountDto,
        @Req() req: Request,
    ): Promise<ResponseDto> {
        try {
            this.assertAdminRoom(req.user as UserContext, id);
            const admin = await this.roomDinasService.createAdmin(id, dto);
            return {
                status: 'success',
                responseCode: HttpStatus.CREATED,
                message: 'Admin account created',
                data: admin,
            };
        } catch (error) {
            return this.handleError(error);
        }
    }

    @Delete(':id/admins/:userId')
    @Roles(Role.SUPERADMIN, Role.ADMIN)
    async deleteAdmin(
        @Param('id', ParseIntPipe) id: number,
        @Param('userId', ParseIntPipe) userId: number,
        @Req() req: Request,
    ): Promise<ResponseDto> {
        try {
            this.assertAdminRoom(req.user as UserContext, id);
            const deleted = await this.roomDinasService.deleteAdmin(id, userId);
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'Admin account deleted',
                data: deleted,
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
