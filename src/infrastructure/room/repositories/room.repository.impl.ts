import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomRepository } from '../../../domain/room/room.repository';
import { Room } from '../../../domain/room/room.entity';
import { RoomTahunAnggaran } from '../../../domain/room/room_tahun_anggaran.entity';
import { RoomOrmEntity } from '../orm/room.orm_entity';
import { RoomTahunAnggaranOrmEntity } from '../orm/room_tahun_anggaran.orm_entity';
import { CreateRoomDto } from 'src/presentation/room/dto/create_room.dto';
import { UpdateRoomDto } from 'src/presentation/room/dto/update_room.dto';
import { GetRoomsDto } from 'src/presentation/room/dto/get_rooms.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class RoomRepositoryImpl implements RoomRepository {
    constructor(
        @InjectRepository(RoomOrmEntity)
        private readonly repo: Repository<RoomOrmEntity>,
        @InjectRepository(RoomTahunAnggaranOrmEntity)
        private readonly tahunAnggaranRepo: Repository<RoomTahunAnggaranOrmEntity>,
    ) {}

    async findAll(dto: GetRoomsDto): Promise<{ data: Room[]; total: number }> {
        try {
            const qb = this.repo.createQueryBuilder('room');

            if (dto.search) {
                qb.andWhere(
                    '(room.nama ILIKE :search OR room.kode_room ILIKE :search)',
                    { search: `%${dto.search}%` },
                );
            }

            if (dto.is_active !== undefined) {
                qb.andWhere('room.is_active = :is_active', { is_active: dto.is_active });
            }

            qb.orderBy('room.id', 'DESC')
                .skip((dto.page - 1) * dto.amount)
                .take(dto.amount);

            const [data, total] = await qb.getManyAndCount();
            return { data, total };
        } catch (error) {
            throw error;
        }
    }

    async findById(id: number): Promise<Room | null> {
        try {
            const entity = await this.repo.findOne({ where: { id } });
            return entity || null;
        } catch (error) {
            throw error;
        }
    }

    async findByKode(kode: string): Promise<Room | null> {
        try {
            const entity = await this.repo.findOne({ where: { kode_room: kode } });
            return entity || null;
        } catch (error) {
            throw error;
        }
    }

    async findByKabkotaId(kabkotaId: number): Promise<Room | null> {
        try {
            const entity = await this.repo.findOne({ where: { kabkota_id: kabkotaId } });
            return entity || null;
        } catch (error) {
            throw error;
        }
    }

    async create(dto: CreateRoomDto): Promise<Room> {
        try {
            const ormEntity = plainToInstance(RoomOrmEntity, dto);
            const newEntity = await this.repo.save(ormEntity);
            return newEntity;
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, dto: UpdateRoomDto): Promise<Room> {
        try {
            await this.repo.update(id, dto as any);
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

    async activate(id: number, isActive: boolean): Promise<Room> {
        try {
            await this.repo.update(id, { is_active: isActive });
            const updatedEntity = await this.repo.findOne({ where: { id } });
            return updatedEntity!;
        } catch (error) {
            throw error;
        }
    }

    async addTahunAnggaran(roomId: number, tahun: number): Promise<RoomTahunAnggaran> {
        try {
            const entity = this.tahunAnggaranRepo.create({ room_id: roomId, tahun, is_active: true });
            const saved = await this.tahunAnggaranRepo.save(entity);
            return saved;
        } catch (error) {
            throw error;
        }
    }

    async removeTahunAnggaran(roomId: number, tahun: number): Promise<boolean> {
        try {
            const result = await this.tahunAnggaranRepo.delete({ room_id: roomId, tahun });
            return (result.affected ?? 0) > 0;
        } catch (error) {
            throw error;
        }
    }

    async getTahunAnggarans(roomId: number): Promise<RoomTahunAnggaran[]> {
        try {
            const entities = await this.tahunAnggaranRepo.find({
                where: { room_id: roomId },
                order: { tahun: 'ASC' },
            });
            return entities;
        } catch (error) {
            throw error;
        }
    }

    async assignKabkota(roomId: number, kabkotaId: number | null): Promise<Room> {
        try {
            await this.repo.update(roomId, { kabkota_id: kabkotaId });
            const updatedEntity = await this.repo.findOne({ where: { id: roomId } });
            return updatedEntity!;
        } catch (error) {
            throw error;
        }
    }
}
