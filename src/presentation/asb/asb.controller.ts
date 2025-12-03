import { Controller, Get, Param, ParseIntPipe, UseGuards, Req, HttpStatus, HttpException, Body, Post, Put, UseInterceptors, UploadedFiles } from '@nestjs/common';
import type { Request } from 'express';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../../common/guards/jwt_auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../domain/user/user_role.enum';
import { AsbService } from '../../domain/asb/asb.service';
import { AsbWithRelationsDto } from '../../application/asb/dto/asb_with_relations.dto';
import { FindAllAsbDto } from '../../application/asb/dto/find_all_asb.dto';
import { CreateAsbStoreIndexDto } from '../../application/asb/dto/create_asb_store_index.dto';
import { UpdateAsbStoreIndexDto } from '../../application/asb/dto/update_asb_store_index.dto';
import { UserContext } from '../../common/types/user-context.type';

@Controller('asb')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AsbController {
    constructor(private readonly asbService: AsbService) { }

    @Get()
    @Roles(Role.OPD, Role.ADMIN, Role.SUPERADMIN)
    async findAll(
        @Body() dto: FindAllAsbDto,
        @Req() req: Request,
    ): Promise<{ status: string; responseCode: number; message: string; data: any }> {
        try {
            const user = req.user as UserContext;
            const result = await this.asbService.findAll(dto, user.idOpd, user.roles);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'ASB list retrieved successfully',
                data: result,
            };
        } catch (error) {
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

    @Get(':id')
    @Roles(Role.OPD, Role.ADMIN, Role.SUPERADMIN)
    async findById(
        @Param('id', ParseIntPipe) id: number,
        @Req() req: Request,
    ): Promise<{ status: string; responseCode: number; message: string; data: AsbWithRelationsDto }> {
        const user = req.user as UserContext;

        const asb = await this.asbService.findById(id, user.idOpd, user.roles);

        return {
            status: 'success',
            responseCode: HttpStatus.OK,
            message: 'ASB retrieved successfully',
            data: asb as unknown as AsbWithRelationsDto,
        };
    }

    @Post('store-index')
    @Roles(Role.OPD, Role.ADMIN, Role.SUPERADMIN)
    @UseInterceptors(FilesInterceptor('surat_rekomendasi'))
    async storeIndex(
        @Body() dto: CreateAsbStoreIndexDto,
        @UploadedFiles() files: Array<Express.Multer.File>,
        @Req() req: Request,
    ): Promise<{ status: string; responseCode: number; message: string; data: any }> {
        try {
            const user = req.user as UserContext;
            const result = await this.asbService.createIndex(dto, files, user.roles);

            return {
                status: 'success',
                responseCode: HttpStatus.CREATED,
                message: 'ASB created successfully',
                data: result,
            };
        } catch (error) {
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

    @Put('store-index')
    @Roles(Role.OPD, Role.ADMIN, Role.SUPERADMIN)
    async updateIndex(
        @Body() dto: UpdateAsbStoreIndexDto,
        @Req() req: Request,
    ): Promise<{ status: string; responseCode: number; message: string; data: any }> {
        try {
            const user = req.user as UserContext;
            const result = await this.asbService.updateIndex(dto, user.idOpd, user.roles);

            return {
                status: 'success',
                responseCode: HttpStatus.OK,
                message: 'ASB updated successfully',
                data: result,
            };
        } catch (error) {
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
}
