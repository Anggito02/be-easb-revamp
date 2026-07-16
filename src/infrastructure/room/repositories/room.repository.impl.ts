import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { RoomRepository } from '../../../domain/room/room.repository';
import { Room } from '../../../domain/room/room.entity';
import { RoomTahunAnggaran } from '../../../domain/room/room_tahun_anggaran.entity';
import { RoomOrmEntity } from '../orm/room.orm_entity';
import { FiscalYearOrmEntity } from '../../fiscal_year/orm/fiscal_year.orm_entity';
import { CreateRoomDto } from 'src/presentation/room/dto/create_room.dto';
import { UpdateRoomDto } from 'src/presentation/room/dto/update_room.dto';
import { GetRoomsDto } from 'src/presentation/room/dto/get_rooms.dto';

@Injectable()
export class RoomRepositoryImpl implements RoomRepository {
    constructor(
        @InjectRepository(RoomOrmEntity)
        private readonly repo: Repository<RoomOrmEntity>,
        @InjectRepository(FiscalYearOrmEntity)
        private readonly fiscalYearRepo: Repository<FiscalYearOrmEntity>,
    ) {}

    async findAll(dto: GetRoomsDto, restrictToRoomId?: number | null): Promise<{ data: Room[]; total: number }> {
        const qb = this.repo.createQueryBuilder('room');

        if (restrictToRoomId != null) {
            qb.andWhere('room.id = :rid', { rid: restrictToRoomId });
        }

        if (dto.search) {
            const search = `%${dto.search}%`;
            qb.andWhere(
                `(room.nama ILIKE :search OR room.kode_room ILIKE :search OR EXISTS (
                    SELECT 1 FROM kabkotas k
                    LEFT JOIN provinces p ON p.id = k.province_id
                    WHERE k.id = room.kabkota_id
                      AND (k.nama ILIKE :search OR p.nama ILIKE :search)
                ))`,
                { search },
            );
        }

        if (dto.is_active !== undefined) {
            qb.andWhere('room.is_active = :is_active', { is_active: dto.is_active });
        }

        qb.orderBy('room.id', 'DESC')
            .skip((dto.page - 1) * dto.amount)
            .take(dto.amount);

        const [data, total] = await qb.getManyAndCount();

        const kabkotaIds = [...new Set(data.map((r) => r.kabkota_id).filter((id): id is number => id != null))];
        const labelByKabkotaId = new Map<number, { kabkota_nama: string; province_nama: string | null }>();
        if (kabkotaIds.length > 0) {
            const rows = await this.repo.manager
                .createQueryBuilder()
                .select('k.id', 'id')
                .addSelect('k.nama', 'kabkota_nama')
                .addSelect('p.nama', 'province_nama')
                .from('kabkotas', 'k')
                .leftJoin('provinces', 'p', 'p.id = k.province_id')
                .where('k.id IN (:...ids)', { ids: kabkotaIds })
                .getRawMany<{ id: string | number; kabkota_nama: string; province_nama: string | null }>();
            for (const row of rows) {
                labelByKabkotaId.set(Number(row.id), {
                    kabkota_nama: row.kabkota_nama,
                    province_nama: row.province_nama ?? null,
                });
            }
        }

        const tahunByKabkotaId = new Map<number, number[]>();
        if (kabkotaIds.length > 0) {
            const fyRows = await this.fiscalYearRepo.find({
                where: { kabkota_id: In(kabkotaIds) },
                order: { tahun: 'ASC' },
            });
            for (const fy of fyRows) {
                const arr = tahunByKabkotaId.get(fy.kabkota_id) ?? [];
                arr.push(fy.tahun);
                tahunByKabkotaId.set(fy.kabkota_id, arr);
            }
        }

        const enriched: Room[] = data.map((room) => {
            const meta = room.kabkota_id != null ? labelByKabkotaId.get(room.kabkota_id) : undefined;
            const tahunAnggaran =
                room.kabkota_id != null ? (tahunByKabkotaId.get(room.kabkota_id) ?? []) : [];
            if (!meta) {
                return { ...room, tahun_anggaran: tahunAnggaran };
            }
            return {
                ...room,
                kabkota_nama: meta.kabkota_nama,
                province_nama: meta.province_nama,
                tahun_anggaran: tahunAnggaran,
            };
        });

        return { data: enriched, total };
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
        const room = await this.repo.findOne({ where: { id: roomId } });
        if (!room || room.kabkota_id == null) {
            throw new NotFoundException(`Room ${roomId} has no linked kabupaten/kota`);
        }
        const entity = this.fiscalYearRepo.create({
            kabkota_id: room.kabkota_id,
            tahun,
            is_active: true,
        });
        const saved = await this.fiscalYearRepo.save(entity);
        return this.mapFiscalYearToRoomTahun(saved, roomId);
    }

    async removeTahunAnggaran(roomId: number, tahun: number): Promise<boolean> {
        const room = await this.repo.findOne({ where: { id: roomId } });
        if (!room || room.kabkota_id == null) {
            return false;
        }
        const result = await this.fiscalYearRepo.delete({ kabkota_id: room.kabkota_id, tahun });
        return (result.affected ?? 0) > 0;
    }

    async getTahunAnggarans(roomId: number): Promise<RoomTahunAnggaran[]> {
        const room = await this.repo.findOne({ where: { id: roomId } });
        if (!room || room.kabkota_id == null) {
            return [];
        }
        const entities = await this.fiscalYearRepo.find({
            where: { kabkota_id: room.kabkota_id },
            order: { tahun: 'ASC' },
        });
        return entities.map((e) => this.mapFiscalYearToRoomTahun(e, roomId));
    }

    async assignKabkota(roomId: number, kabkotaId: number | null): Promise<Room> {
        await this.repo.update(roomId, { kabkota_id: kabkotaId });
        const updated = await this.repo.findOne({ where: { id: roomId } });
        if (!updated) throw new NotFoundException(`Room with id ${roomId} not found`);
        return updated;
    }

    private mapFiscalYearToRoomTahun(row: FiscalYearOrmEntity, roomId: number): RoomTahunAnggaran {
        return {
            id: row.id,
            room_id: roomId,
            kabkota_id: row.kabkota_id,
            tahun: row.tahun,
            is_active: row.is_active,
            createdAt: row.createdAt,
        };
    }
}
