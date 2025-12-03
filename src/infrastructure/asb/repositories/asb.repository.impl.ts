import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, DeepPartial, EntityManager } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { AsbRepository } from '../../../domain/asb/asb.repository';
import { AsbOrmEntity } from '../orm/asb.orm_entity';
import { AsbWithRelationsDto } from 'src/application/asb/dto/asb_with_relations.dto';
import { FindAllAsbDto } from 'src/application/asb/dto/find_all_asb.dto';

@Injectable()
export class AsbRepositoryImpl implements AsbRepository {
    constructor(
        @InjectRepository(AsbOrmEntity)
        private readonly repo: Repository<AsbOrmEntity>,
    ) { }

    async findById(id: number, idOpd?: number): Promise<AsbWithRelationsDto | null> {
        const whereClause: any = { id };

        // Add OPD filter if provided
        if (!idOpd) {
            whereClause.idOpd = idOpd;
        }

        const entity = await this.repo.findOne({
            where: whereClause,
            relations: ['kabkota', 'asbStatus', 'asbJenis', 'opd'],
        });

        if (!entity) {
            return null;
        }

        return plainToInstance(AsbWithRelationsDto, entity);
    }

    async findAll(dto: FindAllAsbDto, idOpd?: number): Promise<{ data: AsbWithRelationsDto[]; total: number }> {
        const whereClause: any = {};

        // Add OPD filter if provided (for OPD users)
        if (idOpd) {
            whereClause.idOpd = idOpd;
        }

        // Add optional filters
        if (dto.idAsbJenis) {
            whereClause.idAsbJenis = dto.idAsbJenis;
        }

        if (dto.idAsbStatus) {
            whereClause.idAsbStatus = dto.idAsbStatus;
        }

        if (dto.tahunAnggaran) {
            whereClause.tahunAnggaran = dto.tahunAnggaran;
        }

        if (dto.namaAsb) {
            whereClause.namaAsb = ILike(`%${dto.namaAsb}%`);
        }

        const [entities, total] = await this.repo.findAndCount({
            where: whereClause,
            relations: ['kabkota', 'asbStatus', 'asbJenis', 'opd'],
            skip: (dto.page - 1) * dto.amount,
            take: dto.amount,
            order: { createdAt: 'DESC' },
        });

        const data = entities.map(entity => plainToInstance(AsbWithRelationsDto, entity));

        return { data, total };
    }

    async create(data: DeepPartial<AsbOrmEntity>): Promise<AsbWithRelationsDto> {
        const entity = this.repo.create(data);
        const savedEntity = await this.repo.save(entity);
        return plainToInstance(AsbWithRelationsDto, savedEntity);
    }

    async update(id: number, data: DeepPartial<AsbOrmEntity>): Promise<AsbWithRelationsDto> {
        await this.repo.update(id, data);
        const updatedEntity = await this.repo.findOne({
            where: { id },
            relations: ['kabkota', 'asbStatus', 'asbJenis', 'opd'],
        });
        return plainToInstance(AsbWithRelationsDto, updatedEntity);
    }

    async delete(id: number): Promise<void> {
        await this.repo.softDelete(id);
    }
}
