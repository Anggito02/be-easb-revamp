import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AsbKomponenBangunanProsRepository } from '../../../domain/asb_komponen_bangunan_pros/asb_komponen_bangunan_pros.repository';
import { AsbKomponenBangunanPros } from '../../../domain/asb_komponen_bangunan_pros/asb_komponen_bangunan_pros.entity';
import { AsbKomponenBangunanProsOrmEntity } from '../orm/asb_komponen_bangunan_pros.orm_entity';
import { CreateAsbKomponenBangunanProsDto } from '../../../presentation/asb_komponen_bangunan_pros/dto/create_asb_komponen_bangunan_pros.dto';
import { GetAsbKomponenBangunanProsListDto } from '../../../presentation/asb_komponen_bangunan_pros/dto/get_asb_komponen_bangunan_pros_list.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AsbKomponenBangunanProsRepositoryImpl implements AsbKomponenBangunanProsRepository {
    constructor(
        @InjectRepository(AsbKomponenBangunanProsOrmEntity)
        private readonly repo: Repository<AsbKomponenBangunanProsOrmEntity>
    ) { }

    async create(data: CreateAsbKomponenBangunanProsDto): Promise<AsbKomponenBangunanPros> {
        try {
            const entity = plainToInstance(AsbKomponenBangunanProsOrmEntity, data);
            const saved = await this.repo.save(entity);
            return saved;
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, data: Partial<AsbKomponenBangunanPros>): Promise<AsbKomponenBangunanPros> {
        try {
            await this.repo.update(id, data);
            const updated = await this.repo.findOne({ where: { id } });
            return updated!;
        } catch (error) {
            throw error;
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            return await this.repo.softDelete(id)
                .then(() => true)
                .catch(() => false);
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number): Promise<AsbKomponenBangunanPros | null> {
        try {
            const entity = await this.repo.findOne({ where: { id } });
            return entity || null;
        } catch (error) {
            throw error;
        }
    }

    async findAll(pagination: GetAsbKomponenBangunanProsListDto): Promise<{ data: AsbKomponenBangunanPros[], total: number }> {
        try {
            const [items, total] = await this.repo.findAndCount({
                skip: (pagination.page - 1) * pagination.amount,
                take: pagination.amount,
                order: { id: 'DESC' }
            });
            return { data: items, total };
        } catch (error) {
            throw error;
        }
    }

    async findByKomponenBangunanId(id: number): Promise<AsbKomponenBangunanPros[]> {
        try {
            return await this.repo.find({ where: { idAsbKomponenBangunan: id } });
        } catch (error) {
            throw error;
        }
    }

    async findByTipeBangunanId(id: number): Promise<AsbKomponenBangunanPros[]> {
        try {
            return await this.repo.find({ where: { idAsbTipeBangunan: id } });
        } catch (error) {
            throw error;
        }
    }
}
