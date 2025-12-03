import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { AsbService } from '../../domain/asb/asb.service';
import { AsbRepository } from '../../domain/asb/asb.repository';
import { AsbWithRelationsDto } from '../../application/asb/dto/asb_with_relations.dto';
import { FindAllAsbDto } from '../../application/asb/dto/find_all_asb.dto';
import { AsbListResultDto } from '../../application/asb/dto/asb_list_result.dto';
import { Role } from '../../domain/user/user_role.enum';

@Injectable()
export class AsbServiceImpl implements AsbService {
    constructor(private readonly repository: AsbRepository) { }

    async findById(id: number, userIdOpd: number | null, userRoles: Role[]): Promise<AsbWithRelationsDto | null> {
        // Check if user is ADMIN or SUPERADMIN
        const isAdmin = userRoles.includes(Role.ADMIN);
        const isSuperAdmin = userRoles.includes(Role.SUPERADMIN);

        if (isAdmin || isSuperAdmin) {
            // ADMIN/SUPERADMIN can access ANY ASB without OPD filter
            const asb = await this.repository.findById(id);

            if (!asb) {
                throw new NotFoundException(`ASB with id ${id} not found`);
            }

            return asb;
        }

        // For OPD users
        const isOpd = userRoles.includes(Role.OPD);

        if (isOpd) {
            // OPD users must have an idOpd
            if (!userIdOpd) {
                throw new ForbiddenException('OPD user has no associated OPD');
            }

            // Fetch with OPD filter
            const asb = await this.repository.findById(id, userIdOpd);

            if (!asb) {
                // Either doesn't exist OR belongs to different OPD (we don't reveal which)
                throw new NotFoundException(`ASB with id ${id} not found`);
            }

            return asb;
        }

        else throw new ForbiddenException('User is not authorized to access this ASB');
    }

    async findAll(dto: FindAllAsbDto, userIdOpd: number | null, userRoles: Role[]): Promise<AsbListResultDto> {
        // Check if user is ADMIN or SUPERADMIN
        const isAdmin = userRoles.includes(Role.ADMIN);
        const isSuperAdmin = userRoles.includes(Role.SUPERADMIN);

        let result: { data: AsbWithRelationsDto[]; total: number };

        if (isAdmin || isSuperAdmin) {
            // ADMIN/SUPERADMIN can access ALL ASB without OPD filter
            result = await this.repository.findAll(dto);
        } else {
            // For OPD users
            const isOpd = userRoles.includes(Role.OPD);

            if (isOpd) {
                // OPD users must have an idOpd
                if (!userIdOpd) {
                    throw new ForbiddenException('OPD user has no associated OPD');
                }

                // Fetch with OPD filter
                result = await this.repository.findAll(dto, userIdOpd);
            } else {
                throw new ForbiddenException('User is not authorized to access ASB list');
            }
        }

        // Return with pagination metadata
        return {
            data: result.data,
            total: result.total,
            page: dto.page,
            amount: dto.amount,
            totalPages: Math.ceil(result.total / dto.amount),
        };
    }
}
