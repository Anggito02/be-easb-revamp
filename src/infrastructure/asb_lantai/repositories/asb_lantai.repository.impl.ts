import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AsbLantaiRepository } from '../../../domain/asb_lantai/asb_lantai.repository';
import { AsbLantai } from '../../../domain/asb_lantai/asb_lantai.entity';
import { AsbLantaiOrmEntity } from '../orm/asb_lantai.orm_entity';
import { CreateAsbLantaiDto } from '../../../presentation/asb_lantai/dto/create_asb_lantai.dto';
import { UpdateAsbLantaiDto } from '../../../presentation/asb_lantai/dto/update_asb_lantai.dto';
import { GetAsbLantaisDto } from '../../../presentation/asb_lantai/dto/get_asb_lantais.dto';
import { plainToInstance } from 'class-transformer';
import { AsbLantaiPaginationResultDto } from 'src/presentation/asb_lantai/dto/asb_lantai_pagination_result.dto';

@Injectable()
export class AsbLantaiRepositoryImpl implements AsbLantaiRepository {
    constructor(@InjectRepository(AsbLantaiOrmEntity) private readonly repo: Repository<AsbLantaiOrmEntity>) { }

    async create(dto: CreateAsbLantaiDto): Promise<AsbLantai> {
        try {
            const ormEntity = plainToInstance(AsbLantaiOrmEntity, dto);
            const newEntity = await this.repo.save(ormEntity);
            return newEntity;
        } catch (error) {
            throw error;
        }
    }

    async update(dto: UpdateAsbLantaiDto): Promise<AsbLantai> {
        try {
            await this.repo.update(dto.id, dto);
            const updatedEntity = await this.repo.findOne({ where: { id: dto.id } });
            return updatedEntity!;
        } catch (error) {
            throw error;
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            return await this.repo.softDelete(id).then(() => true).catch(() => false);
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number): Promise<AsbLantai | null> {
        try {
            const entity = await this.repo.findOne({ where: { id } });
            return entity || null;
        } catch (error) {
            throw error;
        }
    }

    async findAll(pagination: GetAsbLantaisDto): Promise<AsbLantaiPaginationResultDto> {
        try {
            const qb = this.repo.createQueryBuilder('asb_lantai');
            if (pagination.room_id) {
                qb.andWhere('asb_lantai.room_id = :room_id', { room_id: pagination.room_id });
            }
            qb.orderBy('asb_lantai.id', 'DESC');
            qb.skip((pagination.page - 1) * pagination.amount);
            qb.take(pagination.amount);
            const [data, total] = await qb.getManyAndCount();

            return {
                data,
                total,
                page: pagination.page,
                limit: pagination.amount,
                totalPages: Math.ceil(total / pagination.amount)
            };
        } catch (error) {
            throw error;
        }
    }

    async findByLantai(lantai: string): Promise<AsbLantai | null> {
        try {
            const entity = await this.repo.findOne({ where: { lantai } });
            return entity || null;
        } catch (error) {
            throw error;
        }
    }
}
