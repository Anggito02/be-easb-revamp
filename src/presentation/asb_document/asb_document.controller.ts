import {
    Controller,
    Post,
    Get,
    Put,
    Delete,
    Body,
    Query,
    UseGuards,
    HttpStatus,
    HttpException,
    UseInterceptors,
    UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../../common/guards/jwt_auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../domain/user/user_role.enum';
import { AsbDocumentService } from '../../domain/asb_document/asb_document.service';
import { DocumentSpec } from '../../domain/asb_document/document_spec.enum';
import { CreateAsbDocumentDto } from './dto/create_asb_document.dto';
import { UpdateAsbDocumentDto } from './dto/update_asb_document.dto';
import { DeleteAsbDocumentDto } from './dto/delete_asb_document.dto';
import { GetAsbDocumentListDto } from './dto/get_asb_document_list.dto';
import { GetAsbDocumentListFilterDto } from './dto/get_asb_document_list_filter.dto';
import { GetAsbDocumentDetailDto } from './dto/get_asb_document_detail.dto';
import { AsbDocumentPaginationResultDto } from './dto/asb_document_pagination_result.dto';

@Controller('asb-document')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.SUPERADMIN)
export class AsbDocumentController {
    constructor(private readonly service: AsbDocumentService) { }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async create(
        @Body() dto: CreateAsbDocumentDto,
        @UploadedFile() file: Express.Multer.File,
    ) {
        try {
            if (!file) {
                throw new HttpException('File is required', HttpStatus.BAD_REQUEST);
            }

            const result = await this.service.create(dto, file);
            return {
                statusCode: HttpStatus.CREATED,
                message: 'AsbDocument created successfully',
                data: result,
            };
        } catch (error) {
            this.handleError(error);
        }
    }

    @Get()
    async findAll(
        @Query() paginationDto: GetAsbDocumentListDto,
        @Query() filterDto: GetAsbDocumentListFilterDto,
    ) {
        try {
            const result = await this.service.findAll(
                paginationDto.page,
                paginationDto.amount,
                filterDto,
            );

            const response: AsbDocumentPaginationResultDto = {
                data: result.data,
                total: result.total,
                page: paginationDto.page,
                amount: paginationDto.amount,
                totalPages: Math.ceil(result.total / paginationDto.amount),
            };

            return {
                statusCode: HttpStatus.OK,
                message: 'AsbDocument list retrieved successfully',
                data: response,
            };
        } catch (error) {
            this.handleError(error);
        }
    }

    @Get('detail')
    async findOne(@Query() dto: GetAsbDocumentDetailDto) {
        try {
            const result = await this.service.findById(dto.id);
            return {
                statusCode: HttpStatus.OK,
                message: 'AsbDocument detail retrieved successfully',
                data: result,
            };
        } catch (error) {
            this.handleError(error);
        }
    }

    @Get('by-spec')
    async findBySpec(@Query('spec') spec: DocumentSpec) {
        try {
            const result = await this.service.findBySpec(spec);
            return {
                statusCode: HttpStatus.OK,
                message: 'AsbDocument list by spec retrieved successfully',
                data: result,
            };
        } catch (error) {
            this.handleError(error);
        }
    }

    @Put()
    @UseInterceptors(FileInterceptor('file'))
    async update(
        @Body() dto: UpdateAsbDocumentDto,
        @UploadedFile() file?: Express.Multer.File,
    ) {
        try {
            const result = await this.service.update(dto.id, dto, file);
            return {
                statusCode: HttpStatus.OK,
                message: 'AsbDocument updated successfully',
                data: result,
            };
        } catch (error) {
            this.handleError(error);
        }
    }

    @Delete()
    async remove(@Body() dto: DeleteAsbDocumentDto) {
        try {
            await this.service.delete(dto.id);
            return {
                statusCode: HttpStatus.OK,
                message: 'AsbDocument deleted successfully',
            };
        } catch (error) {
            this.handleError(error);
        }
    }

    private handleError(error: any): never {
        if (error instanceof HttpException) {
            throw error;
        }

        if (error.message?.includes('not found')) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }

        if (error.message?.includes('File')) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }

        if (error.code === '23503') {
            throw new HttpException(
                'Foreign key constraint violation',
                HttpStatus.BAD_REQUEST,
            );
        }

        throw new HttpException(
            'Internal server error',
            HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
}
