import {
    Controller,
    Post,
    Get,
    Put,
    Delete,
    Body,
    HttpStatus,
    HttpException,
    Query,
} from '@nestjs/common';
import { AsbKomponenBangunanProsNonstdService } from '../../domain/asb_komponen_bangunan_pros_nonstd/asb_komponen_bangunan_pros_nonstd.service';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentRoom } from '../../common/decorators/current_room.decorator';
import { CreateAsbKomponenBangunanProsNonstdDto } from './dto/create_asb_komponen_bangunan_pros_nonstd.dto';
import { UpdateAsbKomponenBangunanProsNonstdDto } from './dto/update_asb_komponen_bangunan_pros_nonstd.dto';
import { DeleteAsbKomponenBangunanProsNonstdDto } from './dto/delete_asb_komponen_bangunan_pros_nonstd.dto';
import { GetAsbKomponenBangunanProsNonstdListDto } from './dto/get_asb_komponen_bangunan_pros_nonstd_list.dto';
import { GetAsbKomponenBangunanProsNonstdDetailDto } from './dto/get_asb_komponen_bangunan_pros_nonstd_detail.dto';
import { ResponseDto } from '../../common/dto/response.dto';
import { Role } from '../../domain/user/user_role.enum';

@Controller('asb-komponen-bangunan-pros-nonstd')
@Roles(Role.SUPERADMIN)
export class AsbKomponenBangunanProsNonstdController {
    constructor(private readonly service: AsbKomponenBangunanProsNonstdService) { }

    @Post()
    @Roles(Role.SUPERADMIN, Role.ADMIN)
    async create(
        @Body() dto: CreateAsbKomponenBangunanProsNonstdDto,
        @CurrentRoom() roomId: number | null,
    ): Promise<ResponseDto> {
        try {
            if (roomId !== null) {
                (dto as any).room_id = roomId;
            }
            const result = await this.service.create(dto);
            return {
                status: 'success',
                responseCode: HttpStatus.CREATED,
                message: 'AsbKomponenBangunanProsNonstd created',
                data: result,
            };
        } catch (error) {
            return this.handleError(error);
        }
    }

    @Put()
    @Roles(Role.SUPERADMIN)
    async update(@Body() dto: UpdateAsbKomponenBangunanProsNonstdDto): Promise<ResponseDto> {
        try {
            const result = await this.service.update(dto);
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'AsbKomponenBangunanProsNonstd updated',
                data: result,
            };
        } catch (error) {
            return this.handleError(error);
        }
    }

    @Delete()
    @Roles(Role.SUPERADMIN)
    async delete(@Body() dto: DeleteAsbKomponenBangunanProsNonstdDto): Promise<ResponseDto> {
        try {
            const result = await this.service.delete(dto);
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'AsbKomponenBangunanProsNonstd deleted',
                data: result,
            };
        } catch (error) {
            return this.handleError(error);
        }
    }

    @Get()
    @Roles(Role.OPD, Role.VERIFIKATOR, Role.ADMIN, Role.SUPERADMIN)
    async getAll(
        @Query() dto: GetAsbKomponenBangunanProsNonstdListDto,
        @CurrentRoom() roomId: number | null,
    ): Promise<ResponseDto> {
        try {
            if (roomId !== null) {
                dto.room_id = roomId;
            }
            const result = await this.service.getAll(dto);
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'AsbKomponenBangunanProsNonstd list retrieved',
                data: result,
            };
        } catch (error) {
            return this.handleError(error);
        }
    }

    @Get('detail')
    @Roles(Role.SUPERADMIN, Role.ADMIN, Role.VERIFIKATOR, Role.OPD)
    async getDetail(@Query() dto: GetAsbKomponenBangunanProsNonstdDetailDto): Promise<ResponseDto> {
        try {
            const result = await this.service.getDetail(dto);
            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'AsbKomponenBangunanProsNonstd detail retrieved',
                data: result,
            };
        } catch (error) {
            return this.handleError(error);
        }
    }

    private handleError(error: any): ResponseDto {
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
