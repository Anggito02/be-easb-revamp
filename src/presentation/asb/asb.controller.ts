import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AsbService } from '../../application/asb/asb.service';
import { CreateAsbDto } from './dto/create_asb.dto';
import { LantaiDto } from './dto/update_lantai.dto';
import { JwtAuthGuard } from '../../common/guards/jwt_auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('asb')
export class AsbController {
    constructor(private readonly asbService: AsbService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('operator')
    @Post()
    async create(@Body() dto: CreateAsbDto) {
        return this.asbService.create(dto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('operator')
    @Post('lantai')
    async updateLantai(@Body() dto: LantaiDto) {
        // implement logic to update lantai detail using service (stubbed here)
        return { message: 'Lantai saved', data: dto.details };
    }
}
