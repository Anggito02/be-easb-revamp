import { Injectable, NotFoundException } from '@nestjs/common';
import { AsbKomponenBangunanProsService } from '../../domain/asb_komponen_bangunan_pros/asb_komponen_bangunan_pros.service';
import { AsbKomponenBangunanProsRepository } from '../../domain/asb_komponen_bangunan_pros/asb_komponen_bangunan_pros.repository';
import { AsbKomponenBangunanPros } from '../../domain/asb_komponen_bangunan_pros/asb_komponen_bangunan_pros.entity';
import { CreateAsbKomponenBangunanProsDto } from '../../presentation/asb_komponen_bangunan_pros/dto/create_asb_komponen_bangunan_pros.dto';
import { UpdateAsbKomponenBangunanProsDto } from '../../presentation/asb_komponen_bangunan_pros/dto/update_asb_komponen_bangunan_pros.dto';
import { DeleteAsbKomponenBangunanProsDto } from '../../presentation/asb_komponen_bangunan_pros/dto/delete_asb_komponen_bangunan_pros.dto';
import { GetAsbKomponenBangunanProsListDto } from '../../presentation/asb_komponen_bangunan_pros/dto/get_asb_komponen_bangunan_pros_list.dto';
import { GetAsbKomponenBangunanProsDetailDto } from '../../presentation/asb_komponen_bangunan_pros/dto/get_asb_komponen_bangunan_pros_detail.dto';
import { AsbKomponenBangunanProsPaginationResult } from '../../presentation/asb_komponen_bangunan_pros/dto/asb_komponen_bangunan_pros_pagination_result.dto';
import { ValidateStatisticalRangeUseCase } from './use_cases/validate_statistical_range.use_case';

@Injectable()
export class AsbKomponenBangunanProsServiceImpl implements AsbKomponenBangunanProsService {
    constructor(
        private readonly repository: AsbKomponenBangunanProsRepository,
        private readonly validateStatisticalRangeUseCase: ValidateStatisticalRangeUseCase
    ) { }

    async create(dto: CreateAsbKomponenBangunanProsDto): Promise<AsbKomponenBangunanPros> {
        try {
            this.validateStatisticalRangeUseCase.execute(dto.min, dto.avgMin, dto.avg, dto.avgMax, dto.max);
            const entity = await this.repository.create(dto);
            return entity;
        } catch (error) {
            throw error;
        }
    }

    async update(dto: UpdateAsbKomponenBangunanProsDto): Promise<AsbKomponenBangunanPros> {
        try {
            const existing = await this.repository.findById(dto.id);
            if (!existing) {
                throw new NotFoundException(`AsbKomponenBangunanPros with id ${dto.id} not found`);
            }

            // Prepare updated values (use existing if not provided)
            const newMin = dto.min !== undefined ? dto.min : existing.min;
            const newAvgMin = dto.avgMin !== undefined ? dto.avgMin : existing.avgMin;
            const newAvg = dto.avg !== undefined ? dto.avg : existing.avg;
            const newAvgMax = dto.avgMax !== undefined ? dto.avgMax : existing.avgMax;
            const newMax = dto.max !== undefined ? dto.max : existing.max;

            this.validateStatisticalRangeUseCase.execute(newMin, newAvgMin, newAvg, newAvgMax, newMax);

            const updateData: Partial<AsbKomponenBangunanPros> = {
                idAsbKomponenBangunan: dto.idAsbKomponenBangunan,
                idAsbTipeBangunan: dto.idAsbTipeBangunan,
                min: dto.min,
                avgMin: dto.avgMin,
                avg: dto.avg,
                avgMax: dto.avgMax,
                max: dto.max,
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

    async delete(dto: DeleteAsbKomponenBangunanProsDto): Promise<boolean> {
        try {
            const existing = await this.repository.findById(dto.id);
            if (!existing) {
                throw new NotFoundException(`AsbKomponenBangunanPros with id ${dto.id} not found`);
            }
            return await this.repository.delete(dto.id);
        } catch (error) {
            throw error;
        }
    }

    async getAll(pagination: GetAsbKomponenBangunanProsListDto): Promise<AsbKomponenBangunanProsPaginationResult> {
        try {
            const result = await this.repository.findAll(pagination);
            return {
                komponenBangunanProsList: result.data,
                total: result.total,
                page: pagination.page,
                amount: pagination.amount,
                totalPages: Math.ceil(result.total / pagination.amount)
            };
        } catch (error) {
            throw error;
        }
    }

    async getDetail(dto: GetAsbKomponenBangunanProsDetailDto): Promise<AsbKomponenBangunanPros> {
        try {
            const entity = await this.repository.findById(dto.id);
            if (!entity) {
                throw new NotFoundException(`AsbKomponenBangunanPros with id ${dto.id} not found`);
            }
            return entity;
        } catch (error) {
            throw error;
        }
    }

    async findByKomponenBangunanId(id: number): Promise<AsbKomponenBangunanPros[]> {
        try {
            return await this.repository.findByKomponenBangunanId(id);
        } catch (error) {
            throw error;
        }
    }

    async findByTipeBangunanId(id: number): Promise<AsbKomponenBangunanPros[]> {
        try {
            return await this.repository.findByTipeBangunanId(id);
        } catch (error) {
            throw error;
        }
    }
}
