import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { AsbKomponenBangunanService } from '../../domain/asb_komponen_bangunan/asb_komponen_bangunan.service';
import { AsbKomponenBangunanRepository } from '../../domain/asb_komponen_bangunan/asb_komponen_bangunan.repository';
import { AsbKomponenBangunan } from '../../domain/asb_komponen_bangunan/asb_komponen_bangunan.entity';
import { CreateAsbKomponenBangunanDto } from '../../presentation/asb_komponen_bangunan/dto/create_asb_komponen_bangunan.dto';
import { UpdateAsbKomponenBangunanDto } from '../../presentation/asb_komponen_bangunan/dto/update_asb_komponen_bangunan.dto';
import { DeleteAsbKomponenBangunanDto } from '../../presentation/asb_komponen_bangunan/dto/delete_asb_komponen_bangunan.dto';
import { GetAsbKomponenBangunansDto } from '../../presentation/asb_komponen_bangunan/dto/get_asb_komponen_bangunans.dto';
import { GetAsbKomponenBangunanDetailDto } from '../../presentation/asb_komponen_bangunan/dto/get_asb_komponen_bangunan_detail.dto';
import { AsbKomponenBangunansPaginationResult } from '../../presentation/asb_komponen_bangunan/dto/asb_komponen_bangunan_pagination_result.dto';

@Injectable()
export class AsbKomponenBangunanServiceImpl implements AsbKomponenBangunanService {
    constructor(private readonly repository: AsbKomponenBangunanRepository) { }

    async create(dto: CreateAsbKomponenBangunanDto): Promise<AsbKomponenBangunan> {
        try {
            const entity = await this.repository.create(dto);
            return entity;
        } catch (error) {
            throw error;
        }
    }

    async update(dto: UpdateAsbKomponenBangunanDto): Promise<AsbKomponenBangunan> {
        try {
            const existing = await this.repository.findById(dto.id);
            if (!existing) {
                throw new NotFoundException(`AsbKomponenBangunan with id ${dto.id} not found`);
            }

            const updateData: Partial<AsbKomponenBangunan> = {
                komponen: dto.komponen,
                files: dto.files,
                idAsbJenis: dto.idAsbJenis,
            };

            // Remove undefined values
            Object.keys(updateData).forEach(key => {
                if (updateData[key as keyof typeof updateData] === undefined) {
                    delete updateData[key as keyof typeof updateData];
                }
            });

            const updated = await this.repository.update(dto.id, updateData);
            return updated;
        } catch (error) {
            throw error;
        }
    }

    async delete(dto: DeleteAsbKomponenBangunanDto): Promise<boolean> {
        try {
            const existing = await this.repository.findById(dto.id);
            if (!existing) {
                throw new NotFoundException(`AsbKomponenBangunan with id ${dto.id} not found`);
            }
            return await this.repository.delete(dto.id);
        } catch (error) {
            throw error;
        }
    }

    async getAll(pagination: GetAsbKomponenBangunansDto): Promise<AsbKomponenBangunansPaginationResult> {
        try {
            const result = await this.repository.findAll(pagination);
            return {
                komponenBangunans: result.data,
                total: result.total,
                page: pagination.page,
                amount: pagination.amount,
                totalPages: Math.ceil(result.total / pagination.amount)
            };
        } catch (error) {
            throw error;
        }
    }

    async getDetail(dto: GetAsbKomponenBangunanDetailDto): Promise<AsbKomponenBangunan> {
        try {
            const entity = await this.repository.findById(dto.id);
            if (!entity) {
                throw new NotFoundException(`AsbKomponenBangunan with id ${dto.id} not found`);
            }
            return entity;
        } catch (error) {
            throw error;
        }
    }

    async findByKomponen(komponen: string): Promise<AsbKomponenBangunan | null> {
        try {
            return await this.repository.findByKomponen(komponen);
        } catch (error) {
            throw error;
        }
    }
}
