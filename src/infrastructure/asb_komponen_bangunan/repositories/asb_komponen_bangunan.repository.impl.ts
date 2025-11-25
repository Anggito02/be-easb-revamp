import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { AsbKomponenBangunanRepository } from '../../../domain/asb_komponen_bangunan/asb_komponen_bangunan.repository';
import { AsbKomponenBangunan } from '../../../domain/asb_komponen_bangunan/asb_komponen_bangunan.entity';
import { AsbKomponenBangunanOrmEntity } from '../orm/asb_komponen_bangunan.orm_entity';
import { CreateAsbKomponenBangunanDto } from '../../../presentation/asb_komponen_bangunan/dto/create_asb_komponen_bangunan.dto';
import { GetAsbKomponenBangunansDto } from '../../../presentation/asb_komponen_bangunan/dto/get_asb_komponen_bangunans.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AsbKomponenBangunanRepositoryImpl implements AsbKomponenBangunanRepository {
    constructor(
        @InjectRepository(AsbKomponenBangunanOrmEntity)
        private readonly repo: Repository<AsbKomponenBangunanOrmEntity>
    ) { }

    async create(data: CreateAsbKomponenBangunanDto): Promise<AsbKomponenBangunan> {
        try {
            const entity = plainToInstance(AsbKomponenBangunanOrmEntity, data);
            const saved = await this.repo.save(entity);
            return saved;
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, data: Partial<AsbKomponenBangunan>): Promise<AsbKomponenBangunan> {
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

    async findById(id: number): Promise<AsbKomponenBangunan | null> {
        try {
            const entity = await this.repo.findOne({ where: { id } });
            return entity || null;
        } catch (error) {
            throw error;
        }
    }

    async findByKomponen(komponen: string): Promise<AsbKomponenBangunan | null> {
        try {
            const entity = await this.repo.findOne({
                where: { komponen: ILike(`%${komponen}%`) }
            });
            return entity || null;
        } catch (error) {
            throw error;
        }
    }

    async findAll(pagination: GetAsbKomponenBangunansDto): Promise<{ data: AsbKomponenBangunan[], total: number }> {
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
}
