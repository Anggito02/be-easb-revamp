import { Controller, Get, Param, ParseIntPipe, UseGuards, Req, HttpStatus } from '@nestjs/common';
import type { Request } from 'express';
import { JwtAuthGuard } from '../../common/guards/jwt_auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../domain/user/user_role.enum';
import { AsbService } from '../../domain/asb/asb.service';
import { AsbWithRelationsDto } from '../../application/asb/dto/asb_with_relations.dto';
import { UserContext } from '../../common/types/user-context.type';

@Controller('asb')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AsbController {
    constructor(private readonly asbService: AsbService) { }

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
}
