import { Injectable, NotFoundException } from '@nestjs/common';
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

@Injectable()
export class RoomRepositoryImpl implements RoomRepository {
    constructor(
        @InjectRepository(RoomOrmEntity)
        private readonly repo: Repository<RoomOrmEntity>,
        @InjectRepository(RoomTahunAnggaranOrmEntity)
        private readonly tahunAnggaranRepo: Repository<RoomTahunAnggaranOrmEntity>,
    ) {}

    async findAll(dto: GetRoomsDto): Promise<{ data: Room[]; total: number }> {
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
    }

    async findById(id: number): Promise<Room | null> {
        const entity = await this.repo.findOne({ where: { id } });
        return entity || null;
    }

    async findByKode(kode: string): Promise<Room | null> {
        const entity = await this.repo.findOne({ where: { kode_room: kode } });
        return entity || null;
    }

    async findByKabkotaId(kabkotaId: number): Promise<Room | null> {
        const entity = await this.repo.findOne({ where: { kabkota_id: kabkotaId } });
        return entity || null;
    }

    async create(dto: CreateRoomDto): Promise<Room> {
        const newEntity = await this.repo.save({
            kode_room: dto.kode_room,
            nama: dto.nama,
            kabkota_id: dto.kabkota_id ?? null,
            contract_start: dto.contract_start ? new Date(dto.contract_start) : null,
            contract_end: dto.contract_end ? new Date(dto.contract_end) : null,
            is_active: false,
            created_by_user_id: null,
        });
        return newEntity;
    }

    async update(id: number, dto: UpdateRoomDto): Promise<Room> {
        const updateData: Partial<RoomOrmEntity> = { ...dto as any };
        if (dto.contract_start !== undefined) {
            updateData.contract_start = dto.contract_start ? new Date(dto.contract_start) : null;
        }
        if (dto.contract_end !== undefined) {
            updateData.contract_end = dto.contract_end ? new Date(dto.contract_end) : null;
        }
        await this.repo.update(id, updateData);
        const updated = await this.repo.findOne({ where: { id } });
        if (!updated) throw new NotFoundException(`Room with id ${id} not found`);
        return updated;
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.repo.softDelete(id);
        return (result.affected ?? 0) > 0;
    }

    async activate(roomId: number, isActive: boolean): Promise<Room> {
        await this.repo.update(roomId, { is_active: isActive });
        const updated = await this.repo.findOne({ where: { id: roomId } });
        if (!updated) throw new NotFoundException(`Room with id ${roomId} not found`);
        return updated;
    }

    async addTahunAnggaran(roomId: number, tahun: number): Promise<RoomTahunAnggaran> {
        const entity = this.tahunAnggaranRepo.create({ room_id: roomId, tahun, is_active: true });
        const saved = await this.tahunAnggaranRepo.save(entity);
        return saved;
    }

    async removeTahunAnggaran(roomId: number, tahun: number): Promise<boolean> {
        const result = await this.tahunAnggaranRepo.delete({ room_id: roomId, tahun });
        return (result.affected ?? 0) > 0;
    }

    async getTahunAnggarans(roomId: number): Promise<RoomTahunAnggaran[]> {
        const entities = await this.tahunAnggaranRepo.find({
            where: { room_id: roomId },
            order: { tahun: 'ASC' },
        });
        return entities;
    }

    async assignKabkota(roomId: number, kabkotaId: number | null): Promise<Room> {
        await this.repo.update(roomId, { kabkota_id: kabkotaId });
        const updated = await this.repo.findOne({ where: { id: roomId } });
        if (!updated) throw new NotFoundException(`Room with id ${roomId} not found`);
        return updated;
    }
}
