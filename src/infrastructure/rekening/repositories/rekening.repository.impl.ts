import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RekeningRepository } from '../../../domain/rekening/rekening.repository';
import { Rekening } from '../../../domain/rekening/rekening.entity';
import { RekeningOrmEntity } from '../orm/rekening.orm_entity';
import { CreateRekeningDto } from '../../../presentation/rekening/dto/create_rekening.dto';
import { UpdateRekeningDto } from '../../../presentation/rekening/dto/update_rekening.dto';
import { GetRekeningsDto } from '../../../presentation/rekening/dto/get_rekenings.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class RekeningRepositoryImpl implements RekeningRepository {
    constructor(@InjectRepository(RekeningOrmEntity) private readonly repo: Repository<RekeningOrmEntity>) {}

    async create(rekening: CreateRekeningDto): Promise<Rekening> {
        try {
            const ormEntity = plainToInstance(RekeningOrmEntity, rekening);
            const newEntity = await this.repo.save(ormEntity);
            return newEntity;
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, rekening: Partial<Rekening>): Promise<Rekening> {
        try {
            await this.repo.update(id, rekening);
            const updatedEntity = await this.repo.findOne({ where: { id } });
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

    async findById(id: number): Promise<Rekening | null> {
        try {
            const entity = await this.repo.findOne({ where: { id } });
            return entity || null;
        } catch (error) {
            throw error;
        }
    }

    async findByKode(rekeningKode: string, roomId?: number): Promise<Rekening | null> {
        try {
            const qb = this.repo
                .createQueryBuilder('rekening')
                .where('rekening.rekening_kode LIKE :rekeningKode', { rekeningKode: `%${rekeningKode}%` });
            if (roomId !== undefined) {
                qb.andWhere('rekening.room_id = :roomId', { roomId });
            }
            const entity = await qb.getOne();
            return entity || null;
        } catch (error) {
            throw error;
        }
    }

    async findAll(pagination: GetRekeningsDto): Promise<{ data: Rekening[]; total: number }> {
        try {
            const qb = this.repo.createQueryBuilder('rekening');
            if (pagination.room_id) {
                qb.andWhere('rekening.room_id = :room_id', { room_id: pagination.room_id });
            }
            qb.orderBy('rekening.id', 'DESC');
            qb.skip((pagination.page - 1) * pagination.amount);
            qb.take(pagination.amount);
            const [data, total] = await qb.getManyAndCount();
            return { data, total };
        } catch (error) {
            throw error;
        }
    }
}
