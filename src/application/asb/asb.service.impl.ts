import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { AsbService } from '../../domain/asb/asb.service';
import { AsbRepository } from '../../domain/asb/asb.repository';
import { AsbWithRelationsDto } from '../../application/asb/dto/asb_with_relations.dto';
import { FindAllAsbDto } from '../../application/asb/dto/find_all_asb.dto';
import { AsbListResultDto } from '../../application/asb/dto/asb_list_result.dto';
import { Role } from '../../domain/user/user_role.enum';
import { CreateAsbStoreIndexDto } from './dto/create_asb_store_index.dto';
import { UpdateAsbStoreIndexDto } from './dto/update_asb_store_index.dto';
import { UpdateAsbStoreLantaiDto } from './dto/update_asb_store_lantai.dto';
import { CreateAsbDocumentDto } from 'src/presentation/asb_document/dto/create_asb_document.dto';
import { DocumentSpec } from 'src/domain/asb_document/document_spec.enum';
import { AsbDocumentService } from 'src/domain/asb_document/asb_document.service';
import { AsbDetailService } from 'src/domain/asb_detail/asb_detail.service';
import { CreateAsbDetailDto } from 'src/application/asb_detail/dto/create_asb_detail.dto';

@Injectable()
export class AsbServiceImpl implements AsbService {
    constructor(
        private readonly repository: AsbRepository,
        private readonly asbDocumentService: AsbDocumentService,
        private readonly asbDetailService: AsbDetailService
    ) { }

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

    async createIndex(dto: CreateAsbStoreIndexDto, files: Array<Express.Multer.File>, userRoles: Role[]): Promise<{ id: number; status: any }> {
        try {
            // Set status to 1
            dto.idAsbStatus = 1;

            // Create ASB
            const asb = await this.repository.create(dto);

            // Save documents
            files.forEach(async file => {
                const asbDocument = new CreateAsbDocumentDto();
                asbDocument.idAsb = asb.id;
                asbDocument.spec = DocumentSpec.SURAT_REKOMENDASI;

                await this.asbDocumentService.create(asbDocument, file);
            });

            return { id: asb.id, status: asb.idAsbStatus };
        } catch (error) {
            throw error;
        }
    }

    async updateIndex(dto: UpdateAsbStoreIndexDto, userIdOpd: number | null, userRoles: Role[]): Promise<{ id: number; status: any }> {
        // Check permissions
        const isAdmin = userRoles.includes(Role.ADMIN);
        const isSuperAdmin = userRoles.includes(Role.SUPERADMIN);
        const isOpd = userRoles.includes(Role.OPD);

        // Verify existence and ownership
        let existingAsb: AsbWithRelationsDto | null = null;

        if (isAdmin || isSuperAdmin) {
            existingAsb = await this.repository.findById(dto.id);
        } else if (isOpd) {
            if (!userIdOpd) {
                throw new ForbiddenException('OPD user has no associated OPD');
            }
            existingAsb = await this.repository.findById(dto.id, userIdOpd);
        } else {
            throw new ForbiddenException('User is not authorized to update this ASB');
        }

        if (!existingAsb) {
            throw new NotFoundException(`ASB with id ${dto.id} not found or access denied`);
        }

        // Force status to 1
        dto.idAsbStatus = 1;

        // Update ASB
        const updatedAsb = await this.repository.update(dto.id, dto);

        return { id: updatedAsb.id, status: updatedAsb.idAsbStatus };
    }

    async deleteAsb(id: number, userIdOpd: number | null, userRoles: Role[]): Promise<{ id: number }> {
        // Check permissions
        const isAdmin = userRoles.includes(Role.ADMIN);
        const isSuperAdmin = userRoles.includes(Role.SUPERADMIN);
        const isOpd = userRoles.includes(Role.OPD);

        // Verify existence and ownership
        let existingAsb: AsbWithRelationsDto | null = null;

        if (isAdmin || isSuperAdmin) {
            existingAsb = await this.repository.findById(id);
        } else if (isOpd) {
            if (!userIdOpd) {
                throw new ForbiddenException('OPD user has no associated OPD');
            }
            existingAsb = await this.repository.findById(id, userIdOpd);
        } else {
            throw new ForbiddenException('User is not authorized to delete this ASB');
        }

        if (!existingAsb) {
            throw new NotFoundException(`ASB with id ${id} not found or access denied`);
        }

        // Delete all related documents (files and DB records)
        await this.asbDocumentService.deleteByAsbId(id);

        // Delete the ASB record
        await this.repository.delete(id);


        return { id };
    }

    async storeLantai(dto: UpdateAsbStoreLantaiDto, userIdOpd: number | null, userRoles: Role[]): Promise<{ id: number; status: any }> {
        // Check permissions
        const isAdmin = userRoles.includes(Role.ADMIN);
        const isSuperAdmin = userRoles.includes(Role.SUPERADMIN);
        const isOpd = userRoles.includes(Role.OPD);

        // Verify existence and ownership
        let existingAsb: AsbWithRelationsDto | null = null;

        if (isAdmin || isSuperAdmin) {
            existingAsb = await this.repository.findById(dto.id_asb);
        } else if (isOpd) {
            if (!userIdOpd) {
                throw new ForbiddenException('OPD user has no associated OPD');
            }
            existingAsb = await this.repository.findById(dto.id_asb, userIdOpd);
        } else {
            throw new ForbiddenException('User is not authorized to update this ASB');
        }

        if (!existingAsb) {
            throw new NotFoundException(`ASB with id ${dto.id_asb} not found or access denied`);
        }

        // Step 1: Delete existing records if provided
        if (dto.id_asb_detail && dto.id_asb_detail.length > 0) {
            await this.asbDetailService.deleteByIds(dto.id_asb_detail);
        }

        // For bipek_standard and bipek_nonstd, we'd need services injected
        // For now, we'll delete all AsbDetail records for this ASB to ensure clean state
        await this.asbDetailService.deleteByAsbId(dto.id_asb);

        // Step 2: Validate arrays length
        const totalLantai = existingAsb.totalLantai || 0;
        if (dto.luas_lantai.length !== totalLantai ||
            dto.id_asb_lantai.length !== totalLantai ||
            dto.id_asb_fungsi_ruang.length !== totalLantai) {
            throw new ForbiddenException(
                `Array lengths must match total_lantai (${totalLantai})`
            );
        }

        // Step 3: Create AsbDetail records for each floor
        for (let i = 0; i < totalLantai; i++) {
            const createDetailDto = new CreateAsbDetailDto();
            createDetailDto.idAsbLantai = dto.id_asb_lantai[i];
            createDetailDto.idAsbFungsiRuang = dto.id_asb_fungsi_ruang[i];
            createDetailDto.idAsbTipeBangunan = existingAsb.idAsbTipeBangunan;
            createDetailDto.luas = dto.luas_lantai[i];

            // The service will calculate koef values automatically
            await this.asbDetailService.create(createDetailDto);
        }

        // Step 4: Update ASB status to 2
        const updatedAsb = await this.repository.update(dto.id_asb, { idAsbStatus: 2 });

        return { id: updatedAsb.id, status: updatedAsb.idAsbStatus };
    }
}
